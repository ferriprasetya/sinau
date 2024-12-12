import { Category } from './category'
import { Education } from './education'
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
  totalAnswer?: number
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

export type AnswerQuestionRequest = {
  userId: string
  questionId: string
  content: string
}

export type Answer = {
  id: number
  userId: string
  content: string
  upvote: number
  downvote: number
  isCorrect: number
  questionId: string
  createdAt: string
  updatedAt: string
  user?: User
}

export type QuestionCreateRequest = {
  title: string
  description: string
  categories: Category[]
  education: Education | null
}
