export type Category = {
  id: string
  slug: string
  label: string
  createdBy?: string | null
  createdAt?: string
  updatedAt?: string
}

export type CategoryList = {
  data: Category[]
  currentPage: number
  lastPage: number
}
