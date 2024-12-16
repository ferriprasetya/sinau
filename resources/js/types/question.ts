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
  isUpvoted?: boolean
  isDownvoted?: boolean
  educationId: string
}

export type QuestionListFilter = {
  search: string
  category: string | null
  page: number
  sort: string | null
  answer: string | null
  education: string | null
  menu?: string
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
  isUpvoted?: boolean
  isDownvoted?: boolean
}

export type QuestionCreateRequest = {
  id?: string
  title: string
  description: string
  categories: Category[]
  education: Education | null
  imageUrl?: string
}
export type QuestionEditRequest = {
  id?: string
  title: string
  description: string
  categories: Category[]
  education: Education | null
  imageUrl?: string
  education_id?: string
}
