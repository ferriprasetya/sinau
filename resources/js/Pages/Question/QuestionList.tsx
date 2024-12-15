import { Button } from '@/Components/Button'
import Filter from '@/Components/Filter'
import Menu from '@/Components/Menu'
import EmptyState from '@/Components/EmptyState'
import QuestionCard from '@/Components/Questions/QuestionCard'
import Layout from '@/Layouts/Layout'
import { mapQuestionList } from '@/services/questions/QuestionMapper'
import {
  getListQuestion,
  updateQuestionVote,
} from '@/services/questions/QuestionService'
import { QuestionList, QuestionListFilter } from '@/types/question'
import { Head } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'
import QuestionCardLoading from '@/Components/Questions/QuestionCardLoading'

export default function QuestionListPage({ questions }: any) {
  const [listQuestion, setListQuestion] = useState<QuestionList>({
    data: [],
    currentPage: 1,
    lastPage: 1,
  })
  const [filter, setFilter] = useState<QuestionListFilter>({
    search: '',
    category: null,
    page: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    setListQuestion(mapQuestionList(questions))
    setIsLoading(false)
  }, [questions])

  const onGetListQuestion = useCallback(async () => {
    const response = getListQuestion(filter)
    response
      .then((responseData) => {
        setListQuestion((prev) => ({
          data: [...prev.data, ...responseData.data],
          currentPage: responseData.currentPage,
          lastPage: responseData.lastPage,
        }))
      })
      .finally(() => {
        setIsLoading(false)
        setIsLoadingMore(false)
      })
  }, [filter])

  const onLoadMore = () => {
    setIsLoadingMore(true)
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
  }

  useEffect(() => {
    if (filter.search || filter.category) {
      setIsLoading(true)
    }

    if (filter.search || filter.category || filter.page > 1) {
      onGetListQuestion()
    }
  }, [filter, onGetListQuestion])

  const onUpvoteQuestion = (questionId: string) => {
    updateQuestionVote(questionId, true)
  }

  const onDownvoteQuestion = (questionId: string) => {
    updateQuestionVote(questionId, false)
  }
  return (
    <Layout>
      <Head title='Beranda' />
      <div className='container mt-3 flex max-w-[1024px] px-4 sm:mx-auto'>
        <div className='hidden md:block md:w-1/3'>
          <Menu />
        </div>
        <div className='mx-auto md:w-2/3'>
          <div className='mt-8 flex justify-between'>
            <h1 className='text-2xl font-bold'>Semua pertanyaan</h1>
            <Button>Buat Pertanyaan</Button>
          </div>
          <Filter />
          <div className='mt-8 flex flex-col gap-2'>
            {listQuestion.data?.length > 0 ? (
              listQuestion.data.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClickUpvote={onUpvoteQuestion}
                  onClickDownvote={onDownvoteQuestion}
                />
              ))
            ) : isLoading ? (
              Array(3)
                .fill('')
                .map((_, index) => (
                  <QuestionCardLoading key={`loading-question-${index}`} />
                ))
            ) : (
              <EmptyState isFilter={!!(filter.search || filter.category)} />
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
    </Layout>
  )
}
