import {
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
  CardFooter,
} from '@nextui-org/react'
import { Button } from '../Button'
import { useEffect, useMemo, useState } from 'react'
import { EducationList } from '@/types/education'
import { CategoryList } from '@/types/category'
import { getListEducation } from '@/services/educations/EducationService'
import { getPaginatedListCategory } from '@/services/categories/CategoryService'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { QuestionListFilter } from '@/types/question'
export default function DetailFilter({
  showFilter,
  filterData,
  setFilterData,
}: {
  showFilter: boolean
  filterData: QuestionListFilter
  setFilterData: React.Dispatch<React.SetStateAction<QuestionListFilter>>
}) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedEducations, setSelectedEducations] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState([])

  const [educations, setEducations] = useState<EducationList>({
    currentPage: 1,
    lastPage: 1,
    data: [],
  })

  const [isLoadingCategory, setIsLoadingCategory] = useState(true)
  const [categories, setCategories] = useState<CategoryList>({
    currentPage: 1,
    lastPage: 1,
    data: [],
  })
  const answer = [
    { key: 'correct-answer', label: 'Jawaban benar' },
    { key: 'unanswered', label: 'Belum terjawab' },
    { key: 'no-correct', label: 'Belum ada jawaban benar' },
  ]

  useEffect(() => {
    const getEducations = async () => {
      const response = await getListEducation(educations.currentPage)
      setEducations(response)
    }

    const getCategories = async () => {
      setIsLoadingCategory(true)
      const response = await getPaginatedListCategory(categories.currentPage)
      setCategories(response)
      setIsLoadingCategory(false)
    }

    getCategories()
    getEducations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadMoreCategories = async () => {
    setIsLoadingCategory(true)
    setCategories((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))
    const response = await getPaginatedListCategory(categories.currentPage + 1)
    setCategories({ ...response, data: [...categories.data, ...response.data] })
    setIsLoadingCategory(false)
  }

  const [isOpenCategory, setIsOpenCategory] = useState(false)

  const [, categoryRef] = useInfiniteScroll({
    isEnabled: isOpenCategory,
    hasMore: categories.currentPage < categories.lastPage,
    shouldUseLoader: false,
    onLoadMore: onLoadMoreCategories,
  })
  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      answer: Array.from(selectedAnswer).join(','),
      page: 1,
    }))
  }, [selectedAnswer, setFilterData])

  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      category: Array.from(selectedCategories).join(','),
      page: 1,
    }))
  }, [selectedCategories, setFilterData])

  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      education: Array.from(selectedEducations).join(','),
      page: 1,
    }))
  }, [selectedEducations, setFilterData])

  const isFilterSelected = useMemo(() => {
    return !!(filterData.answer || filterData.category || filterData.education)
  }, [filterData])

  const resetFilter = () => {
    setSelectedAnswer([])
    setSelectedCategories([])
    setSelectedEducations([])
  }
  return (
    <Card
      className={`${!showFilter ? 'hidden' : 'block'} relative mt-8 px-5 py-4`}
    >
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <h1 className='text-medium font-medium text-neutral-700 md:text-lg'>
          Filter
        </h1>
      </CardHeader>
      <CardBody className='overflow-hidden py-2 md:flex'>
        <div className='grid gap-2 md:grid-cols-3'>
          <div>
            <Select
              label='Jawaban'
              placeholder='Pilih jawaban'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
              items={answer}
              selectedKeys={selectedAnswer}
              onSelectionChange={setSelectedAnswer as () => void}
            >
              {(option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              )}
            </Select>
          </div>
          <div>
            <Select
              label='Pendidikan'
              placeholder='Pilih pendidikan'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
              selectionMode='multiple'
              selectedKeys={selectedEducations}
              onSelectionChange={setSelectedEducations as () => void}
              items={educations.data}
            >
              {(education) => (
                <SelectItem key={education.id}>{education.label}</SelectItem>
              )}
            </Select>
          </div>
          <div>
            <Select
              label='Kategori'
              placeholder='Pilih kategori'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
              selectionMode='multiple'
              isLoading={isLoadingCategory}
              items={categories.data}
              selectedKeys={selectedCategories}
              onSelectionChange={setSelectedCategories as () => void}
              scrollRef={categoryRef}
              onOpenChange={setIsOpenCategory}
            >
              {(category) => (
                <SelectItem key={category.id}>{category.label}</SelectItem>
              )}
            </Select>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        {isFilterSelected && (
          <Button
            variant='light'
            color='secondary'
            onClick={resetFilter}
            className='ml-auto'
          >
            Hapus Filter
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
