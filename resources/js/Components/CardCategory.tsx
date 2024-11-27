import { Category } from '@/types/category'

function CardCategory({ category }: { category: Category }) {
  return (
    <div className='my-1 mr-2 rounded-lg bg-primary-50 px-2 text-xs font-medium text-primary-500'>
      {category.label}
    </div>
  )
}

export default CardCategory
