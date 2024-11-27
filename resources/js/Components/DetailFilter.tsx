import {
  Card,
  CardHeader,
  CardBody,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { Button } from './Button'
export default function DetailFilter({ showFilter }: { showFilter: boolean }) {
  const educations = [
    { key: 'smp', label: 'SMP' },
    { key: 'sma', label: 'SMA' },
    { key: 'smk', label: 'SMK' },
    { key: 'kuliah', label: 'Kuliah' },
  ]
  const categories = [
    { key: 'programming', label: 'Programming' },
    { key: 'coding', label: 'Coding' },
    { key: 'gabut', label: 'Gabut' },
    { key: 'ngeteh', label: 'Ngeteh' },
  ]
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
        <div className='flex flex-col justify-between gap-4 md:flex-row'>
          <div>
            <RadioGroup
              classNames={{
                label: 'text-sm md:text-medium font-medium text-foreground-500',
              }}
              label='Jawaban'
              orientation='vertical'
            >
              <Radio value='belumterjawab'>Belum terjawab</Radio>
              <Radio value='belumadajawabanbenar'>
                Belum ada jawaban benar
              </Radio>
            </RadioGroup>
          </div>
          <div className='w-full md:w-52'>
            <Select
              label='Pendidikan'
              placeholder='Pilih pendidikan'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
            >
              {educations.map((education) => (
                <SelectItem key={education.key}>{education.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className='w-full md:w-96'>
            <Select
              label='Kategori'
              placeholder='Pilih kategori'
              className='text-sm font-medium text-foreground-500 md:text-medium'
              radius='sm'
              labelPlacement='outside'
            >
              {categories.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <h1 className='mt-3 text-medium font-medium text-neutral-700 md:text-lg'>
            Urutkan
          </h1>
          <div className='mt-3'>
            <RadioGroup
              classNames={{
                label: 'text-sm md:text-medium font-medium text-foreground-500',
              }}
              // label='Urutkan'
              orientation='horizontal'
            >
              <Radio value='terbaru'>Terbaru</Radio>
              <Radio value='dukunganterbanyak'>dukungan terbanyak</Radio>
              <Radio value='jawabanterbanyak'>jawaban terbanyak</Radio>
            </RadioGroup>
          </div>
          <div className='mt-3 flex'>
            <Button
              className='text-xs font-medium md:text-sm'
              radius='sm'
              variant='ghost'
              color='primary'
            >
              Terapkan Filter
            </Button>
            <Button
              className='ml-3 text-xs font-medium'
              radius='sm'
              variant='ghost'
              color='default'
            >
              batal
            </Button>
          </div>
        </div>
      </CardBody>
      {/* <CardFooter className='mt-3 flex items-center justify-between rounded-3xl bg-neutral-50 px-2 py-2'></CardFooter> */}
    </Card>
  )
}
