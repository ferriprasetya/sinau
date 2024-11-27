import axios from 'axios'
import { mapQuestionList } from './QuestionMapper'
import { QuestionListFilter } from '@/types/question'
import { buildParams } from '@/lib/buildParams'

export const getListQuestion = async (filter: QuestionListFilter) => {
  const queryString = buildParams(filter)
  const response = await axios.get(`/api/questions${queryString}`)
  return mapQuestionList(response?.data)
}
