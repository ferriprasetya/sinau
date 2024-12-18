import Layout from '@/Layouts/Layout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { Button } from '@/Components/Button'
import QuestionCardDetail from '@/Components/Questions/QuestionCardDetail'
import Typography from '@/Components/Typography'
import AnswerCard from '@/Components/AnswerCard'
import AnsweringCard from '@/Components/AnsweringCard'
import { useState } from 'react'
import {
  mapQuestionAnswers,
  mapQuestionDetail,
} from '@/services/questions/QuestionMapper'
import {
  getQuestionAnswers,
  updateAnswerVote,
  updateQuestionVote,
} from '@/services/questions/QuestionService'
import ModalConfirm from '@/Components/ModalConfirm'
import { Answer } from '@/types/question'
import convertObjectCamelToSnakeCase from '@/lib/convertObjectCamelToSnakeCase'
import BackButton from '@/Components/BackButton'
import ModalVoteLogin from '@/Components/Questions/ModalVoteLogin'
function DetailAnswer({ question, answers, educations }: any) {
  const { auth } = usePage().props as any
  const isLogin = !!auth.user
  const userId = auth.user?.id
  const questionData = mapQuestionDetail(question)
  const [answersData, setAnswersData] = useState(mapQuestionAnswers(answers))
  const [showModalLogin, setShowModalLogin] = useState(false)

  const sortAAnswers = [
    {
      id: 'oldest',
      text: 'Terlama',
    },
    {
      id: 'latest',
      text: 'Terbaru',
    },
    {
      id: 'most-like',
      text: 'Paling Banyak Disukai',
    },
    {
      id: 'lowest-like',
      text: 'Paling Sedikit Disukai',
    },
  ]

  const [sort, setSort] = useState('')

  const [isAnswerQuestion, setIsAnswerQuestion] = useState(false)
  const toggleAnswerQuestion = () => {
    if (!isLogin) {
      toggleConfirmLogin()
      return
    }
    setIsAnswerQuestion(!isAnswerQuestion)
  }

  const {
    data: answerRequest,
    setData: setAnswerRequest,
    post: submitAnswer,
    processing: isLoadingSubmitAnswer,
    transform: transformAnswerRequest,
    reset: resetAnswerRequest,
  } = useForm({
    userId,
    questionId: questionData.id,
    content: '',
  })

  const onSubmitAnswer = () => {
    transformAnswerRequest((data) => {
      return convertObjectCamelToSnakeCase(data)
    })
    submitAnswer(route('question.answer'), {
      preserveScroll: true,
      onFinish: () => {
        toggleAnswerQuestion()
        resetAnswerRequest()
        onGetListAnswer()
      },
    })
  }

  const [isConfirmLogin, setIsConfirmLogin] = useState(false)

  const toggleConfirmLogin = () => {
    setIsConfirmLogin(!isConfirmLogin)
  }
  const redirectToLogin = () => {
    router.visit('/login?redirectTo=/question/' + questionData.slug)
  }

  const [_isLoadingAnswers, setIsLoadingAnswers] = useState(false)

  const onGetListAnswer = async () => {
    setIsLoadingAnswers(true)
    const answers = await getQuestionAnswers(questionData.id, sort)
    setAnswersData(answers)
    setIsLoadingAnswers(false)
  }

  const onSortChange = (e: any) => {
    setSort(e.target.value)
    onGetListAnswer()
  }

  const { patch: submitMarkAnswer } = useForm()
  const markAsCorrectAnswer = (answer: Answer) => {
    if (answer.isCorrect) {
      onRemoveAsCorrectAnswer(answer.id)
      return
    }
    onMarkAsCorrectAnswer(answer.id)
  }

  const onMarkAsCorrectAnswer = (answerId: number) => {
    submitMarkAnswer(route('question.answer.correct', answerId), {
      onFinish: () => onGetListAnswer(),
    })
  }
  const onRemoveAsCorrectAnswer = (answerId: number) => {
    submitMarkAnswer(route('question.answer.removeCorrect', answerId), {
      onFinish: () => onGetListAnswer(),
    })
  }

  const onUpvoteAnswer = (answerId: number) => {
    if (!isLogin) {
      setShowModalLogin(true)
      return
    }
    updateAnswerVote(answerId, true)
  }

  const onDownvoteAnswer = (answerId: number) => {
    if (!isLogin) {
      setShowModalLogin(true)
      return
    }
    updateAnswerVote(answerId, false)
  }

  const onUpvoteQuestion = (questionId: string) => {
    if (!isLogin) {
      setShowModalLogin(true)
      return
    }
    updateQuestionVote(questionId, true)
  }

  const onDownvoteQuestion = (questionId: string) => {
    if (!isLogin) {
      setShowModalLogin(true)
      return
    }
    updateQuestionVote(questionId, false)
  }
  return (
    <Layout>
      <Head title={question.title} />
      <div className='container mx-auto mt-8 flex max-w-[1024px] flex-col items-start md:flex-row'>
        <div className='w-full space-y-8 px-4 sm:mx-auto'>
          <div className='flex w-full flex-col justify-between sm:flex-row sm:items-center md:gap-8'>
            <div className='order-2 hidden sm:order-1 sm:block'>
              <Breadcrumbs
                separator='/'
                itemClasses={{
                  separator: 'px-2',
                }}
              >
                <BreadcrumbItem>
                  <Link href='/question'>Pertanyaan</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  {questionData.title.length > 10
                    ? `${questionData.title.substring(0, 20)}...`
                    : questionData.title}
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className='order-1 flex justify-between sm:order-2'>
              <BackButton className='block sm:hidden' />
              <div className='my-3 self-end sm:my-0'>
                <Button
                  as={Link}
                  href='/question/create'
                  color='primaryGradient'
                >
                  Buat Pertanyaan
                </Button>
              </div>
            </div>
          </div>
          <QuestionCardDetail
            isLogin={isLogin}
            educations={educations}
            question={questionData}
            onClickDownvote={onDownvoteQuestion}
            onClickUpvote={onUpvoteQuestion}
          />

          <Typography
            variant='t'
            weight='medium'
            className='border-b border-neutral-200 pb-3 text-neutral-700'
          >
            {answersData?.length} Jawaban
          </Typography>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <Select
              label='Urutkan'
              className='order-2 max-w-44 sm:order-1'
              size='sm'
              classNames={{
                trigger: 'bg-white',
              }}
              onChange={(e) => onSortChange(e)}
            >
              {sortAAnswers.map((sortAnswer) => (
                <SelectItem key={sortAnswer.id}>{sortAnswer.text}</SelectItem>
              ))}
            </Select>
            {!isAnswerQuestion && (
              <Button
                color='primaryGradient'
                className='order-1 sm:order-2'
                onClick={() => toggleAnswerQuestion()}
              >
                Jawab Pertanyaan
              </Button>
            )}
          </div>
          {isAnswerQuestion && (
            <AnsweringCard
              content={answerRequest.content}
              setContent={(content) => setAnswerRequest('content', content)}
              onCancel={() => setIsAnswerQuestion(false)}
              onSubmit={onSubmitAnswer}
              loadingSubmit={isLoadingSubmitAnswer}
            />
          )}
          {answersData.length ? (
            answersData.map((answer, index) => (
              <AnswerCard
                key={index}
                answer={answer}
                isLogin={isLogin}
                ableToCorrect={userId === questionData.userId}
                markAsCorrect={markAsCorrectAnswer}
                onClickDownvote={onDownvoteAnswer}
                onClickUpvote={onUpvoteAnswer}
                onGetListAnswer={onGetListAnswer}
              />
            ))
          ) : (
            <Typography
              variant='t'
              weight='medium'
              className='text-center text-neutral-700'
            >
              Belum ada jawaban
            </Typography>
          )}
        </div>

        <ModalConfirm
          isOpen={isConfirmLogin}
          onOpenChange={toggleConfirmLogin}
          title='Harap login untuk menjawab pertanyaan'
          content='Anda tidak dapat menjawab pertanyaan jika belum login. Harap login terlebih dahulu untuk melanjutkan.'
          confirmText='Login'
          confirmButtonColor='primaryGradient'
          onConfirm={redirectToLogin}
        />
      </div>
      <Head />

      <ModalVoteLogin
        showModal={showModalLogin}
        setShowModal={setShowModalLogin}
      />
    </Layout>
  )
}

export default DetailAnswer
