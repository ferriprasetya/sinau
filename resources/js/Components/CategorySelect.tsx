'use client'

import * as React from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { X, ChevronDown } from 'lucide-react'
import { getListCategory } from '@/services/categories/CategoryService'

interface Category {
  id: string
  slug: string
  label: string
}

interface CategorySelectProps {
  onChange?: (categories: Category[]) => void
  defaultCategories?: Category[]
}

const customStyles = {
  container: (base: any) => ({
    ...base,
    width: '100%',
  }),
  control: (base: any) => ({
    ...base,
    backgroundColor: '#F1F5FE',
    // border: '1px solid #e5e7eb',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    border: 'none',
    color: 'rgb(168 173 195)',
    '&:hover': {
      // borderColor: '#e5e7eb',
    },
    minHeight: '48px',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#6b7280',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 50,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f3f4f6' : 'transparent',
    color: '#374151',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
    padding: '0.75rem 1rem',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: '#9ca3af',
  }),
}

// // Sample data - replace with your actual categories from API
// const existingCategories: Category[] = [
//   { id: '1', slug: 'pemrograman', label: 'Pemrograman' },
//   { id: '2', slug: 'desain', label: 'Desain' },
//   { id: '3', slug: 'marketing', label: 'Marketing' },
//   { id: '4', slug: 'bisnis', label: 'Bisnis' },
//   { id: '5', slug: 'teknologi', label: 'Teknologi' },
// ]

export function CategorySelect({
  onChange,
  defaultCategories = [],
}: CategorySelectProps) {
  const [selectedCategories, setSelectedCategories] =
    React.useState<Category[]>(defaultCategories)
  const onGetListCategory = async (inputValue: string) => {
    const categories = await getListCategory(inputValue)
    return categories
  }

  const loadOptions = async (inputValue: string) => {
    return await onGetListCategory(inputValue)
  }

  const handleChange = (newValue: any) => {
    if (newValue && selectedCategories.length < 5) {
      const updatedCategories = [...selectedCategories, newValue]
      setSelectedCategories(updatedCategories)
      onChange?.(updatedCategories)
    }
  }

  const removeCategory = (categoryToRemove: Category) => {
    const updatedCategories = selectedCategories.filter(
      (cat) => cat.id !== categoryToRemove.id,
    )
    setSelectedCategories(updatedCategories)
    onChange?.(updatedCategories)
  }

  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  return (
    <div className='space-y-4 rounded-xl bg-white p-6 shadow-sm'>
      <div className='space-y-4'>
        <div className='flex items-baseline space-x-1'>
          <label className='text-[15px] font-medium text-indigo-900'>
            Kategori
          </label>
          <span className='text-red-500'>*</span>
        </div>

        <AsyncCreatableSelect
          defaultOptions
          styles={customStyles}
          loadOptions={loadOptions}
          onChange={handleChange}
          value={null}
          getOptionValue={(option: Category) => option.id}
          getOptionLabel={(option: Category) => option.label}
          placeholder='Pilih kategori'
          noOptionsMessage={() => 'Tidak ada pilihan'}
          formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => (
              <ChevronDown
                className={`ease absolute end-3 mr-2 h-4 w-5 text-gray-400 transition-transform duration-200 data-[menuIsOpen=true]:rotate-180 ${
                  menuIsOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            ),
          }}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
        />

        <p className='text-[13px] text-gray-500'>
          Tambahkan 1-5 kategori untuk mendeskripsikan bidang yang anda tanyakan
        </p>
      </div>

      {selectedCategories.length > 0 && (
        <div>
          <div className='mb-2 text-sm text-gray-500'>Kategori Terpilih:</div>
          <div className='flex flex-wrap gap-2'>
            {selectedCategories.map((category) => (
              <div
                key={category.id}
                className='flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700'
              >
                {category.label}
                <button
                  onClick={() => removeCategory(category)}
                  className='ml-1 rounded-full p-0.5 transition-colors hover:bg-gray-200'
                >
                  <X className='h-3.5 w-3.5' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
