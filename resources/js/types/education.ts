export type Education = {
  id: string
  label: string
  slug: string
}

export type EducationList = {
  data: Education[]
  currentPage: number
  lastPage: number
}
