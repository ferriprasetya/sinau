import { Button } from '@/Components/Button'
import FilterMakeQuestion from '@/Components/FilterMakeQuestion'
import { Input } from '@/Components/Input'
import Typography from '@/Components/Typography'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import {
  Autocomplete,
  AutocompleteItem,
  Chip,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { useState } from 'react'

function MakeQuestion() {
  const educations = [
    { key: 'smp', label: 'SMP' },
    { key: 'sma', label: 'SMA' },
    { key: 'smk', label: 'SMK' },
    { key: 'kuliah', label: 'Kuliah' },
  ]
  const [value, setValue] = useState<string>('')
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)

  console.log(value, selectedKey)

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key)
  }

  const onInputChange = (value: string) => {
    setValue(value)
  }

  const categoryData = [
    { key: 'ilmu pengetahuan alam', label: 'Ilmu Pengetahuan Alam' },
    { key: 'ilmu pengetahuan sosial', label: 'Ilmu Pengetahuan Sosial' },
    { key: 'matematika', label: 'Matematika' },
    { key: 'bahasa indonesia', label: 'Bahasa Indonesia' },
    { key: 'bahasa inggris', label: 'Bahasa Inggris' },
    { key: 'bahasa jawa', label: 'Bahasa Jawa' },
  ]
  const initialcategories = [
    'Apple',
    'Banana',
    'Cherry',
    'Watermelon',
    'Orange',
  ]

  const [categories, setcategories] = useState(initialcategories)

  const handleClose = (categoryToRemove: string): void => {
    setcategories(
      categories.filter((category: string) => category !== categoryToRemove),
    )
    if (categories.length === 1) {
      setcategories(initialcategories)
    }
  }

  const [isComplex, setIsComplex] = useState(false)

  return (
    <Layout>
      <Head title='Buat Pertanyaan' />
      <div className='container mx-auto mt-8 w-full max-w-[1024px]'>
        <div className='space-y-8 px-4'>
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
          <div className='w-full rounded-xl bg-white px-6 py-6'>
            <Input
              isClearable
              name='title'
              isRequired
              type='text'
              label='Judul Pertanyaan'
              labelPlacement='outside'
              placeholder='Contoh: Bagaimana cara membuat website?'
              description='Tuliskan judul yang singkat, mudah dimengerti, dan spesifik'
            />
          </div>
          <div className='w-full rounded-xl bg-white px-6 py-6'>
            <Autocomplete
              label='Kategori'
              variant='flat'
              placeholder='Pilih kategori'
              labelPlacement='outside'
              defaultItems={categoryData}
              className='w-full border-none'
              allowsCustomValue={true}
              onSelectionChange={onSelectionChange}
              onInputChange={onInputChange}
              isRequired
              description='Tambahkan 1 - 5 kategori untuk mendeskripsikan bidang yang anda tanyakan'
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <p className='mt-1 flex space-x-3 text-small text-default-500'>
              <p>Kategori Terpilih:</p>
              {/* <Chip>{selectedKey?.toString() || ''}</Chip> */}
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  onClose={() => handleClose(category)}
                  variant='flat'
                >
                  {category}
                </Chip>
              ))}
            </p>
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
            >
              {educations.map((education) => (
                <SelectItem key={education.key}>{education.label}</SelectItem>
              ))}
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
              placeholder='Enter your description (Default autosize)'
            />
          </div>
          <div className='flex w-full justify-end'>
            <Button>Simpan Pertanyaan</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MakeQuestion
