import { Button, ButtonGroup } from '@nextui-org/react'
interface FilterMakeQuestionProps {
  isComplex: boolean
  setIsComplex: (value: boolean) => void
}

function FilterMakeQuestion({
  isComplex,
  setIsComplex,
}: FilterMakeQuestionProps) {
  return (
    <>
      <div className='flex flex-col justify-start md:flex-row md:justify-between'>
        <ButtonGroup>
          <div className='flex h-10 w-auto items-center justify-center rounded-l-xl bg-white pl-1'>
            <Button
              onClick={() => setIsComplex(false)}
              className={`${!isComplex ? 'bg-gradient-secondary text-white' : 'bg-white text-secondary-900'} h-6 rounded-lg px-5 py-4 font-semibold`}
            >
              Pertanyaan Singkat
            </Button>
          </div>
          <div className='flex h-10 w-auto items-center justify-center rounded-r-xl bg-white pl-3 pr-1'>
            <Button
              onClick={() => setIsComplex(true)}
              className={`${isComplex ? 'bg-gradient-secondary text-white' : 'bg-white text-secondary-900'} h-6 rounded-lg px-5 py-4 font-semibold`}
            >
              Pertanyaan Kompleks
            </Button>
          </div>
        </ButtonGroup>
      </div>
    </>
  )
}

export default FilterMakeQuestion
