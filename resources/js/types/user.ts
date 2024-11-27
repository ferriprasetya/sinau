export type User = {
  id: string
  name: string
  email: string
  googleId: string
  createdAt: string
  updatedAt: string
  point: number
  emailVerifiedAt?: string
  gender?: string
  dateOfBirth?: string
  school?: string
  profileUrl?: string
  badgeId?: number
  badges?: Badge[]
  badge?: Badge
}

export type Badge = {
  label: string
  id: number
  imageUrl: string
  slug: string
}
