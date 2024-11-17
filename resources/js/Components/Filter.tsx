import { Button, ButtonGroup } from '@nextui-org/button'
import { IoFilter } from 'react-icons/io5'
import DetailFilter from './DetailFilter'
import { useState } from 'react'
function Filter() {
  const [showFilter, setShowFilter] = useState(false)
  return (
    <>
      <div className='mt-8 flex flex-col justify-start md:flex-row md:justify-between'>
        <div className='order-2 mt-6 md:order-1 md:mt-0'>
          <Button
            startContent={<IoFilter />}
            variant='bordered'
            radius='sm'
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </Button>
        </div>
        <div className='order-1 md:order-2'>
          <ButtonGroup>
            <div className='flex h-10 w-24 items-center justify-center rounded-l-xl bg-white'>
              <Button className='h-6 rounded-lg bg-gradient-secondary px-5 py-4 font-semibold text-white'>
                terbaru
              </Button>
            </div>
            <div className='flex h-10 w-24 items-center justify-center bg-white'>
              <Button className='h-6 rounded-lg bg-white px-5 py-4 font-semibold text-secondary-900'>
                terbaru
              </Button>
            </div>
            <div className='flex h-10 w-24 items-center justify-center rounded-r-xl bg-white'>
              <Button className='h-6 rounded-lg bg-white px-5 py-4 font-semibold text-secondary-900'>
                terbaru
              </Button>
            </div>
          </ButtonGroup>
        </div>
      </div>
      <DetailFilter showFilter={showFilter} />
    </>
  )
}

export default Filter
