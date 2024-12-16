import { Button } from '@/Components/Button'
import { CategorySelect } from '@/Components/CategorySelect'
import FilterMakeQuestion from '@/Components/FilterMakeQuestion'
import { Input } from '@/Components/Input'
import ModalConfirm from '@/Components/ModalConfirm'
import Typography from '@/Components/Typography'
import Layout from '@/Layouts/Layout'
import { mapQuestionCreatePayload as mapQuestionEditPayload } from '@/services/questions/QuestionMapper'
import { Category } from '@/types/category'
import { Education } from '@/types/education'
import { QuestionEditRequest } from '@/types/question'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Select, SelectItem, Textarea } from '@nextui-org/react'
import { useState } from 'react'

interface EditQuestionProps {
  question: QuestionEditRequest
  educations: Education[]
  category: Category[]
  education_id: string
}

function EditQuestion({ question, educations }: EditQuestionProps) {
  const { auth } = usePage().props as any
  const isLogin = !!auth.user

  const [isConfirmLogin, setIsConfirmLogin] = useState(false)
  const toggleConfirmLogin = () => setIsConfirmLogin(!isConfirmLogin)

  const redirectToLogin = () => {
    router.visit('/login?redirectTo=/question/edit')
  }

  const educationExist =
    educations.find((edu) => edu.id === question.education_id) ?? null

  const {
    data: questionForm,
    setData: setQuestionForm,
    patch: submitQuestion,
    processing: isLoadingSubmit,
    transform: transformEditRequest,
    errors: questionFormError,
  } = useForm<QuestionEditRequest>({
    title: question.title || '',
    description: question.description || '',
    categories: question.categories || [],
    education: educationExist,
  })

  const onSubmitQuestion = () => {
    if (!isLogin) {
      toggleConfirmLogin()
      return
    }

    transformEditRequest((data) => {
      return mapQuestionEditPayload(data)
    })

    submitQuestion(route('question.update', { id: question.id }), {
      onFinish: () => {
        // router.visit('/question')
      },
    })
  }

  const [isComplex, setIsComplex] = useState(question.description?.length > 0)

  const setEducationForm = (education: string) => {
    const educationData = educations.find((edu) => edu.id === education) ?? null
    setQuestionForm('education', educationData)
  }

  return (
    <Layout>
      <Head title='Edit Pertanyaan' />
      <div className='container mx-auto mt-8 w-full max-w-[1024px]'>
        <div className='space-y-8 px-4'>
          <Typography
            variant='h5'
            className='font-semibold text-foreground-500'
          >
            Edit Pertanyaan
          </Typography>
          <FilterMakeQuestion
            isComplex={isComplex}
            setIsComplex={setIsComplex}
          />
          <div className='w-full rounded-xl bg-white px-6 py-6'>
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
            />
          </div>
          <div className='mx-auto'>
            <CategorySelect
              defaultCategories={questionForm.categories}
              onChange={(categories) => {
                setQuestionForm('categories', categories)
              }}
            />
          </div>
          <div className='w-full rounded-xl bg-white px-6 py-6'>
            <Select
              isRequired
              label='Tingkat Pendidikan'
              placeholder='Pilih pendidikan'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
              description='Pilih tingkat pendidikan yang sesuai dengan pertanyaan Anda'
              items={educations}
              defaultSelectedKeys={
                educationExist?.id ? [educationExist.id] : []
              }
              onChange={(e) => setEducationForm(e.target.value)}
            >
              {(education) => (
                <SelectItem key={education.id}>{education.label}</SelectItem>
              )}
            </Select>
          </div>
          <div
            className={
              isComplex ? `w-full rounded-xl bg-white px-6 py-6` : 'hidden'
            }
          >
            <Textarea
              description='Tuliskan penjabaran dari pertanyaan anda secara rinci dan berikan informasi yang dapat membantu untuk menjawab pertanyaan anda'
              label='Description'
              placeholder='Enter your description'
              value={questionForm.description}
              labelPlacement='outside'
              onChange={(e) => setQuestionForm('description', e.target.value)}
            />
          </div>
          <div className='flex w-full justify-end'>
            <Button
              isDisabled={isLoadingSubmit}
              isLoading={isLoadingSubmit}
              onClick={onSubmitQuestion}
            >
              Perbarui Pertanyaan
            </Button>
          </div>
          <ModalConfirm
            isOpen={isConfirmLogin}
            onOpenChange={toggleConfirmLogin}
            title='Harap login untuk mengedit pertanyaan'
            content='Anda tidak dapat mengedit pertanyaan jika belum login. Harap login terlebih dahulu untuk melanjutkan.'
            confirmText='Login'
            confirmButtonColor='primaryGradient'
            onConfirm={redirectToLogin}
          />
        </div>
      </div>
    </Layout>
  )
}

export default EditQuestion
