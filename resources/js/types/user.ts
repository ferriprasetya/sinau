export type User = {
  id: string
  name: string
  email: string
  point: number
  googleId?: string
  createdAt?: string
  updatedAt?: string
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
