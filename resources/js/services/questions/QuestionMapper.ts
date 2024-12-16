import convertObjectCamelToSnakeCase from '@/lib/convertObjectCamelToSnakeCase'
import {
  Answer,
  Question,
  QuestionCreateRequest,
  QuestionList,
} from '@/types/question'
import dayjs from 'dayjs'

export function mapQuestionList(response: any): QuestionList {
  return {
    currentPage: response.current_page,
    lastPage: response.last_page,
    data: response.data?.length
      ? response.data?.map(
          (item: any): Question => ({
            id: item.id,
            userId: item.user_id,
            title: item.title,
            slug: item.slug,
            upvote: item.upvote,
            downvote: item.downvote,
            imageUrl: item.image_url,
            content: item.content,
            isCorrect: item.is_correct,
            isUpvoted: item.is_upvoted,
            isDownvoted: item.is_downvoted,
            createdAt: dayjs(item.created_at).fromNow(true) + ' yang lalu',
            updatedAt: dayjs(item.created_at).fromNow(true) + ' yang lalu',
            user: {
              id: item.user.id,
              name: item.user.name,
              email: item.user.email,
              profileUrl: item.user.profile_url,
              badgeId: item.user.badge_id,
              point: item.user.point,
              badge: {
                id: item.user.badge?.id,
                label: item.user.badge?.label,
                imageUrl: item.user.badge?.image_url,
                slug: item.user.badge?.slug,
              },
            },
            categories: item.categories.map((cat: any) => ({
              id: cat.id,
              slug: cat.slug,
              label: cat.label,
            })),
            totalAnswer: item.answers_count,
          }),
        )
      : [],
  }
}

export function mapQuestionDetail(response: any): Question {
  return {
    id: response.id,
    userId: response.user_id,
    title: response.title,
    slug: response.slug,
    upvote: response.upvote,
    downvote: response.downvote,
    imageUrl: response.image_url,
    content: response.content,
    isCorrect: response.is_correct,
    isUpvoted: response.is_upvoted,
    isDownvoted: response.is_downvoted,
    createdAt: dayjs(response.created_at).fromNow(true) + ' yang lalu',
    updatedAt: dayjs(response.updated_at).fromNow(true) + ' yang lalu',
    user: {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      profileUrl: response.user.profile_url,
      point: response.user.point,
      badge: {
        id: response.user.badge?.id,
        label: response.user.badge?.label,
        imageUrl: response.user.badge?.image_url,
        slug: response.user.badge?.slug,
      },
    },
    categories: response.categories.map((cat: any) => ({
      id: cat.id,
      slug: cat.slug,
      label: cat.label,
    })),
  }
}

export function mapQuestionAnswers(response: any): Answer[] {
  return response?.length
    ? response.map(
        (item: any): Answer => ({
          id: item.id,
          userId: item.user_id,
          content: item.content,
          createdAt: dayjs(item.created_at).fromNow(true) + ' yang lalu',
          updatedAt: item.updated_at,
          upvote: item.upvote,
          downvote: item.downvote,
          isCorrect: item.is_correct,
          questionId: item.question_id,
          isUpvoted: item.is_upvoted,
          isDownvoted: item.is_downvoted,
          user: item.user?.id
            ? {
                id: item.user.id,
                name: item.user.name,
                email: item.user.email,
                profileUrl: item.user.profile_url,
                point: item.user.point,
                badge: {
                  id: item.user.badge?.id,
                  label: item.user.badge?.label,
                  imageUrl: item.user.badge?.image_url,
                  slug: item.user.badge?.slug,
                },
              }
            : undefined,
        }),
      )
    : []
}

export const mapQuestionCreatePayload = (data: QuestionCreateRequest) => {
  const payload = {
    title: data.title,
    content: data.description,
    categories: data.categories,
    educationId: data.education?.id,
    imageUrl: data.imageUrl,
    aiAnswer: data.aiAnswer,
  }

  return convertObjectCamelToSnakeCase(payload)
}

export const mapAnswerCreatePayload = (data: any) => {
  const payload = {
    content: data.content,
    questionId: data.questionId,
    userId: data.userId,
  }

  return convertObjectCamelToSnakeCase(payload)
}
