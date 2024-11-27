import { Category } from './category'
import { User } from './user'

export type Question = {
  id: string
  userId: string
  title: string
  slug: string
  upvote: number
  downvote: number
  imageUrl: string | null
  content: string
  isCorrect: boolean
  createdAt: string
  updatedAt: string
  user: User
  categories: Category[]
  answers?: any[]
}

export type QuestionListFilter = {
  search: string
  category: string | null
  page: number
}

export type QuestionList = {
  data: Question[]
  currentPage: number
  lastPage: number
}
