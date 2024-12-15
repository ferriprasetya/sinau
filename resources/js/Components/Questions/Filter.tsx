import { Badge, Button, Tab, Tabs } from '@nextui-org/react'
import { IoFilter } from 'react-icons/io5'
import DetailFilter from './DetailFilter'
import { useEffect, useMemo, useState } from 'react'
import { QuestionListFilter } from '@/types/question'
function Filter({
  filterData,
  setFilterData,
}: {
  filterData: QuestionListFilter
  setFilterData: React.Dispatch<React.SetStateAction<QuestionListFilter>>
}) {
  const [showFilter, setShowFilter] = useState(false)
  const [selectedSorting, setSorting] = useState('')

  const sortingOptions = [
    {
      label: 'Terbaru',
      value: '',
    },
    {
      label: 'Banyak Jawaban',
      value: 'most-answered',
    },
    {
      label: 'Banyak Dukungan',
      value: 'most-upvoted',
    },
  ]

  useEffect(() => {
    setFilterData((prev) => ({ ...prev, sort: selectedSorting, page: 1 }))
  }, [selectedSorting, setFilterData])

  const countFilterUsed = useMemo(() => {
    let count = 0
    if (filterData.category) count++
    if (filterData.education) count++
    if (filterData.answer) count++
    return count
  }, [filterData])

  return (
    <>
      <div className='mt-8 flex flex-col justify-start md:flex-row md:justify-between'>
        <div className='order-2 mt-6 md:order-1 md:mt-0'>
          <Badge
            color='secondary'
            content={countFilterUsed}
            isInvisible={countFilterUsed === 0}
          >
            <Button
              startContent={<IoFilter />}
              variant='bordered'
              radius='sm'
              onClick={() => setShowFilter(!showFilter)}
              className={showFilter ? 'bg-info-50' : 'bg-white'}
            >
              Filter
            </Button>
          </Badge>
        </div>
        <div className='order-1 md:order-2'>
          <Tabs
            aria-label='Urutkan berdasarkan'
            size='lg'
            classNames={{
              tabList: 'bg-white max-sm:gap-0',
              cursor:
                'bg-transparent group-data-[selected=true]:bg-gradient-secondary',
              tabContent:
                'group-data-[selected=true]:text-white group-data-[selected=true]:font-medium max-sm:text-sm',
            }}
            selectedKey={selectedSorting}
            onSelectionChange={(key: string | number) =>
              setSorting(key as string)
            }
            items={sortingOptions}
          >
            {(option) => <Tab key={option.value} title={option.label} />}
          </Tabs>
        </div>
      </div>
      <DetailFilter
        showFilter={showFilter}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  )
}

export default Filter
