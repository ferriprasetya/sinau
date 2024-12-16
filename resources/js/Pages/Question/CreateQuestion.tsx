import { Button } from '@/Components/Button'
import { CategorySelect } from '@/Components/CategorySelect'
import FilterMakeQuestion from '@/Components/FilterMakeQuestion'
import { Input } from '@/Components/Input'
import ModalConfirm from '@/Components/ModalConfirm'
import Typography from '@/Components/Typography'
import Layout from '@/Layouts/Layout'
import clsxm from '@/lib/clsxm'
import { mapQuestionCreatePayload } from '@/services/questions/QuestionMapper'
import { Education } from '@/types/education'
import { QuestionCreateRequest } from '@/types/question'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { useState } from 'react'

function CreateQuestion({ educations }: { educations: Education[] }) {
  const { auth } = usePage().props as any
  const isLogin = !!auth.user

  const [isConfirmLogin, setIsConfirmLogin] = useState(false)

  const toggleConfirmLogin = () => {
    setIsConfirmLogin(!isConfirmLogin)
  }

  const redirectToLogin = () => {
    router.visit('/login?redirectTo=/question/create')
  }

  const {
    data: questionForm,
    setData: setQuestionForm,
    post: submitQuestion,
    processing: isLoadingSubmit,
    transform: transformAnswerRequest,
    errors: questionFormError,
  } = useForm<QuestionCreateRequest>({
    title: '',
    description: '',
    categories: [],
    education: null,
    aiAnswer: true,
  })

  const onSubmitQuestion = () => {
    transformAnswerRequest((data) => {
      return mapQuestionCreatePayload(data)
    })
    if (!isLogin) {
      // Jika belum login, tampilkan modal konfirmasi
      toggleConfirmLogin()
      return
    }
    submitQuestion(route('question.store'), {
      // preserveScroll: true,
      onFinish: () => {
        // router.visit('/question')
      },
    })
  }

  const [isComplex, setIsComplex] = useState(false)

  const setEducationForm = (education: string) => {
    const educationData: Education[] = []
    educations.forEach((item) => {
      if (item.id === education) {
        educationData.push(item)
      }
    })
    setQuestionForm('education', educationData[0])
  }
  return (
    <Layout>
      <Head title='Buat Pertanyaan' />
      <div className='container mx-auto mt-8 w-full max-w-[1024px]'>
        <div className='space-y-4 px-4 md:space-y-8'>
          <Typography
            variant='h5'
            className='font-semibold text-foreground-500'
          >
            Buat Pertanyaan
          </Typography>
          <FilterMakeQuestion
            isComplex={isComplex}
            setIsComplex={setIsComplex}
          />
          {/* <pre>{JSON.stringify(questionForm)}</pre> */}
          <div className='w-full rounded-xl bg-white px-4 py-4 md:px-6 md:py-6'>
            <Input
              errorMessage={questionFormError.title}
              value={questionForm.title}
              onChange={(e) => setQuestionForm('title', e.target.value)}
              isInvalid={!!questionFormError.title}
              isRequired
              name='title'
              type='text'
              label='Judul Pertanyaan'
              labelPlacement='outside'
              placeholder='Contoh: Bagaimana cara membuat website?'
              description='Tuliskan judul yang singkat, mudah dimengerti, dan spesifik'
              classNames={{
                label: 'text-base font-medium !text-foreground-500',
              }}
            />
          </div>
          <div className='mx-auto'>
            <CategorySelect
              onChange={(categories) => {
                setQuestionForm('categories', categories)
              }}
            />
          </div>
          <div className='w-full rounded-xl bg-white px-4 py-4 md:px-6 md:py-6'>
            <Select
              isRequired
              label='Tingkat Pendidikan'
              placeholder='Pilih pendidikan'
              className='text-base font-medium text-foreground-500'
              radius='sm'
              labelPlacement='outside'
              description='Pilih tingkat pendidikan yang sesuai dengan pertanyaan Anda'
              items={educations}
              onChange={(e) => setEducationForm(e.target.value)}
              classNames={{
                label: 'text-base font-medium !text-foreground-500',
              }}
            >
              {(education) => (
                <SelectItem key={education.id}>{education.label}</SelectItem>
              )}
            </Select>
          </div>
          <div
            className={
              isComplex
                ? `w-full rounded-xl bg-white px-4 py-4 md:px-6 md:py-6`
                : 'hidden'
            }
          >
            <Textarea
              description='Tuliskan penjabaran dari pertanyaan anda secara rinci dan berikan informasi yang dapat membantu untuk menjawab pertanyaan anda'
              label='Description'
              placeholder='Enter your description'
              labelPlacement='outside'
              onChange={(e) => setQuestionForm('description', e.target.value)}
              classNames={{
                label: 'text-base font-medium !text-foreground-500',
              }}
            />
          </div>
          <div className='w-full rounded-xl bg-white px-4 py-4 md:px-6 md:py-6'>
            <Typography
              variant='bm'
              className='font-semibold text-foreground-500 max-md:text-base'
            >
              Biar AI yang Bantu Jawab! 🤖
            </Typography>
            <Typography variant='bm' className='text-neutral-600'>
              AI akan memberikan jawaban pertama dari pertanyaanmu. Nonaktifkan
              opsi dibawah apabila tidak ingin dibantu AI.
            </Typography>
            <Switch
              className='mt-4'
              color='primary'
              isSelected={questionForm.aiAnswer}
              onValueChange={(value) => setQuestionForm('aiAnswer', value)}
            >
              <Typography
                variant='bm'
                className={clsxm(
                  'font-medium',
                  questionForm.aiAnswer ? 'text-primary' : 'text-neutral-600',
                )}
              >
                {questionForm.aiAnswer ? 'AI Aktif' : 'AI Nonaktif'}
              </Typography>
            </Switch>
          </div>
          <div className='flex w-full justify-end'>
            <Button
              isDisabled={isLoadingSubmit}
              isLoading={isLoadingSubmit}
              onClick={onSubmitQuestion}
            >
              Simpan Pertanyaan
            </Button>
          </div>
          <ModalConfirm
            isOpen={isConfirmLogin}
            onOpenChange={toggleConfirmLogin}
            title='Harap login untuk menjawab pertanyaan'
            content='Anda tidak dapat membuat pertanyaan jika belum login. Harap login terlebih dahulu untuk melanjutkan.'
            confirmText='Login'
            confirmButtonColor='primaryGradient'
            onConfirm={redirectToLogin}
          />
        </div>
      </div>
    </Layout>
  )
}

export default CreateQuestion
