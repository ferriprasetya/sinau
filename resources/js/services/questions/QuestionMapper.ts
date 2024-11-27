import { Question, QuestionList } from '@/types/question'
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
            createdAt: dayjs(item.created_at).fromNow(true) + ' yang lalu',
            updatedAt: dayjs(item.created_at).fromNow(true) + ' yang lalu',
            user: {
              id: item.user.id,
              name: item.user.name,
              email: item.user.email,
              emailVerifiedAt: item.user.email_verified_at,
              gender: item.user.gender,
              dateOfBirth: item.user.date_of_birth,
              school: item.user.school,
              profileUrl: item.user.profile_url,
              googleId: item.user.google_id,
              createdAt: item.user.created_at,
              updatedAt: item.user.updated_at,
              badgeId: item.user.badge_id,
              point: item.user.point,
              badge: {
                id: item.user.badge?.id,
                label: item.user.badge?.label,
                imageUrl: item.user.badge?.image_url,
                slug: item.user.badge?.slug,
              },
            },
            categories: item.category.map((cat: any) => ({
              id: cat.id,
              slug: cat.slug,
              label: cat.label,
              createdBy: cat.created_by,
              createdAt: cat.created_at,
              updatedAt: cat.updated_at,
              pivot: {
                questionId: cat.pivot.question_id,
                categoryId: cat.pivot.category_id,
              },
            })),
          }),
        )
      : [],
  }
}
