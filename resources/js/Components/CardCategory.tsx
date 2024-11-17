function CardCategory({ category, key }: { category: string; key: number }) {
  return (
    <div
      key={key}
      className='my-1 mr-2 rounded-lg bg-primary-50 px-2 text-xs font-medium text-primary-500'
    >
      {category}
    </div>
  )
}

export default CardCategory
