import { Button } from '@/Components/Button'
import Filter from '@/Components/Questions/Filter'
import Menu from '@/Components/Questions/Menu'
import EmptyState from '@/Components/EmptyState'
import QuestionCard from '@/Components/Questions/QuestionCard'
import Layout from '@/Layouts/Layout'
import { mapQuestionList } from '@/services/questions/QuestionMapper'
import {
  getListQuestion,
  updateQuestionVote,
} from '@/services/questions/QuestionService'
import { QuestionList, QuestionListFilter } from '@/types/question'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import QuestionCardLoading from '@/Components/Questions/QuestionCardLoading'
import { FaArrowUp, FaListUl } from 'react-icons/fa'
import { BsPersonLinesFill } from 'react-icons/bs'
import ModalVoteLogin from '@/Components/Questions/ModalVoteLogin'

export default function QuestionListPage({ questions, educations }: any) {
  const { auth } = usePage().props as any
  const isLogin = !!auth.user
  const [showModalLogin, setShowModalLogin] = useState(false)

  const selectedMenu = new URLSearchParams(window.location.search).get('menu')
  const searchParams = new URLSearchParams(window.location.search).get('search')
  const [listQuestion, setListQuestion] = useState<QuestionList>({
    data: [],
    currentPage: 1,
    lastPage: 1,
  })
  const [filter, setFilter] = useState<QuestionListFilter>({
    search: searchParams ?? '',
    category: null,
    page: 1,
    answer: null,
    sort: '',
    education: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    setListQuestion(mapQuestionList(questions))
    setIsLoading(false)
  }, [questions])

  const onGetListQuestion = useCallback(
    async (loadmore = false) => {
      const response = getListQuestion({ ...filter, menu: selectedMenu ?? '' })
      response
        .then((responseData) => {
          setListQuestion((prev) => ({
            data: loadmore
              ? [...prev.data, ...responseData.data]
              : responseData.data,
            currentPage: responseData.currentPage,
            lastPage: responseData.lastPage,
          }))
        })
        .finally(() => {
          setIsLoading(false)
          setIsLoadingMore(false)
        })
    },
    [filter, selectedMenu],
  )

  const onLoadMore = () => {
    setIsLoadingMore(true)
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
  }

  useEffect(() => {
    setIsLoading(true)
    if (filter.page > 1) {
      onGetListQuestion(true)
    } else {
      onGetListQuestion(false)
    }
  }, [filter, onGetListQuestion])

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

  const isFilterUsed = useMemo(() => {
    return !!(
      filter.search ||
      filter.category ||
      filter.answer ||
      filter.sort ||
      filter.education
    )
  }, [filter])

  const menuOptions = useMemo(
    () => [
      {
        key: '',
        label: 'Semua pertanyaan',
        icon: (
          <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-primary-50'>
            <FaListUl className='fill-primary-600' />
          </div>
        ),
      },
      {
        key: 'upvoted',
        label: 'Pertanyaan Didukung',
        icon: (
          <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-success-50'>
            <FaArrowUp className='fill-success-600' />
          </div>
        ),
      },
      {
        key: 'my-question',
        label: 'Pertanyaan Saya',
        icon: (
          <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-info-50'>
            <BsPersonLinesFill className='fill-info-600' />
          </div>
        ),
      },
    ],
    [],
  )
  const onChangeMenu = (selectedMenu: string) => {
    router.get('/question', selectedMenu ? { menu: selectedMenu } : undefined, {
      replace: true,
    })
  }

  const selectedTitle = useMemo(
    () =>
      filter.search
        ? `Hasil pencarian: ${filter.search}`
        : (menuOptions.find((option) => option.key === selectedMenu)?.label ??
          'Semua Pertanyaan'),
    [menuOptions, selectedMenu, filter.search],
  )
  return (
    <Layout>
      <Head title='Pertanyaan' />
      <div className='container mt-3 flex w-full max-w-[1024px] px-4 sm:mx-auto'>
        <div className='hidden md:block md:w-1/3'>
          <Menu
            menuOptions={menuOptions}
            selectedMenu={selectedMenu ?? ''}
            onChangeMenu={onChangeMenu}
          />
        </div>
        <div className='w-full md:w-2/3'>
          <div className='mt-8 flex justify-between'>
            <h1 className='text-2xl font-bold'>{selectedTitle}</h1>
            <Button as={Link} href='/question/create'>
              Buat Pertanyaan
            </Button>
          </div>
          <Filter filterData={filter} setFilterData={setFilter} />
          <div className='mt-8 flex flex-col gap-2'>
            {isLoading ? (
              Array(3)
                .fill('')
                .map((_, index) => (
                  <QuestionCardLoading key={`loading-question-${index}`} />
                ))
            ) : listQuestion.data?.length > 0 ? (
              listQuestion.data.map((question) => (
                <QuestionCard
                  key={question.id}
                  isLogin={isLogin}
                  question={question}
                  educations={educations}
                  onClickUpvote={onUpvoteQuestion}
                  onClickDownvote={onDownvoteQuestion}
                />
              ))
            ) : (
              <EmptyState isFilter={isFilterUsed} />
            )}
            {listQuestion.currentPage < listQuestion.lastPage && (
              <Button
                variant='bordered'
                color='primary'
                className='mx-auto'
                onClick={onLoadMore}
                isLoading={isLoadingMore}
              >
                Tampilkan lebih banyak
              </Button>
            )}
          </div>
        </div>
      </div>
      <ModalVoteLogin
        showModal={showModalLogin}
        setShowModal={setShowModalLogin}
      />
    </Layout>
  )
}
