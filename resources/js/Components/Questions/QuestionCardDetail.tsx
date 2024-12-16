import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6'
import Typography from '../Typography'
import { Question } from '@/types/question'
import { IoPersonCircle } from 'react-icons/io5'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import clsxm from '@/lib/clsxm'
import { Link, usePage } from '@inertiajs/react'

interface QuestionCardProps {
  question: Question
  onClickUpvote?: (_questionId: string) => void
  onClickDownvote?: (_questionId: string) => void
}

export default function QuestionCardDetail({
  question: {
    id,
    title,
    user,
    content,
    createdAt,
    imageUrl,
    upvote,
    downvote,
    isUpvoted,
    isDownvoted,
  },
  onClickUpvote = () => {},
  onClickDownvote = () => {},
}: QuestionCardProps) {
  const [isReadMore, setIsReadMore] = useState(false)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  const [totalUpvote, setTotalUpvote] = useState(upvote)
  const [totalDownvote, setTotalDownvote] = useState(downvote)

  const handleUpvote = () => {
    onClickUpvote(id)
    if (checkIsUpvoted) {
      setTotalUpvote(Math.max(totalUpvote - 1, 0))
      return
    }
    setTotalUpvote(totalUpvote + 1)
    setTotalDownvote(Math.max(totalDownvote - 1, 0))
  }

  const handleDownvote = () => {
    onClickDownvote(id)
    if (checkIsDownvoted) {
      setTotalDownvote(Math.max(totalDownvote - 1, 0))
    }
    setTotalUpvote(Math.max(totalUpvote - 1, 0))
    setTotalDownvote(totalDownvote + 1)
  }

  const checkIsUpvoted = useMemo(
    () => (isUpvoted && totalUpvote == upvote) || totalUpvote > upvote,
    [totalUpvote, isUpvoted, upvote],
  )

  const checkIsDownvoted = useMemo(
    () =>
      (isDownvoted && totalDownvote == downvote) || totalDownvote > downvote,
    [totalDownvote, isDownvoted, downvote],
  )

  const { auth } = usePage().props as any

  return (
    <Card className='relative mb-6 px-5 py-4'>
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <h1 className='text-lg font-semibold text-foreground-500 md:text-2xl'>
          {title}
        </h1>
        <div className='my-4 flex items-center'>
          <div className='mr-3'>
            {user.profileUrl ? (
              <Image
                src={user.profileUrl}
                className='h-9 w-9 rounded-full object-cover'
              />
            ) : (
              <IoPersonCircle className='h-9 w-9 text-neutral-500' />
            )}
          </div>
          <div>
            <div className='flex items-center gap-1'>
              <h2 className='text-medium font-semibold text-foreground-500 md:text-lg'>
                {user.name}
              </h2>
              {user.badge?.imageUrl ? (
                <Image src={user.badge.imageUrl} className='h-5 w-5' />
              ) : (
                <HiMiniAcademicCap className='h-5 w-5 text-secondary' />
              )}
              <span className='text-medium font-medium text-secondary md:text-lg'>
                {user.point}
              </span>
            </div>
            <span className='text-xs font-normal text-neutral-600 md:text-sm'>
              {createdAt}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-hidden py-2 md:flex'>
        <div className='flex flex-col'>
          {imageUrl && (
            <div className='mb-3 h-52 overflow-hidden'>
              <img
                alt='Card background'
                className='h-52 w-auto rounded object-cover'
                src={imageUrl}
                height={256}
              />
            </div>
          )}
          <div className=''>
            <p className='text-lg'>
              {content.length > 300 && !isReadMore ? (
                <>
                  {content.slice(0, 300)}...
                  <br />
                  <Typography
                    onClick={() => toggleReadMore()}
                    variant='bl'
                    weight='regular'
                    className='text-primary-500'
                  >
                    Baca Selengkapnya
                  </Typography>
                </>
              ) : (
                <Typography variant='bl' weight='regular'>
                  {content}
                </Typography>
              )}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className='mt-3 flex flex-col items-start justify-between gap-4 rounded-3xl px-2 py-2 sm:flex-row sm:items-center'>
        <div className='order-2 flex items-center sm:order-1'>
          <button
            className={clsxm(
              'group mr-2 flex items-center rounded-xl border px-2 py-1 transition-all',
              checkIsUpvoted
                ? 'bg-primary-500 hover:opacity-80'
                : 'bg-primary-50 hover:border-primary-500',
            )}
            onClick={handleUpvote}
          >
            <FaArrowUp
              className={clsxm(
                'h-3 group-hover:animate-bounce',
                checkIsUpvoted ? 'fill-primary-50' : 'fill-primary-500',
              )}
            />
            <p
              className={clsxm(
                'text-sm font-medium',
                checkIsUpvoted ? 'text-primary-50' : 'text-primary-500',
              )}
            >
              Dukung
            </p>
            <span
              className={clsxm(
                'mx-1 text-sm font-medium',
                checkIsUpvoted ? 'text-neutral-300' : 'text-neutral-600',
              )}
            >
              |{' '}
            </span>
            <span
              className={clsxm(
                'text-xs font-medium md:text-sm',
                checkIsUpvoted ? 'text-neutral-300' : 'text-neutral-600',
              )}
            >
              {totalUpvote}
            </span>
          </button>
          <button
            className={clsxm(
              'group flex items-center rounded-xl border px-2 py-1',
              checkIsDownvoted
                ? 'bg-neutral-500 text-foreground-50 hover:opacity-80'
                : 'bg-foreground-50 text-neutral-600 hover:border-neutral-500',
            )}
            onClick={handleDownvote}
          >
            <FaArrowDown
              className={clsxm(
                'h-3 group-hover:animate-bounce',
                checkIsDownvoted ? 'fill-foreground-50' : 'fill-neutral-700',
              )}
            />
            <span className='mx-1 text-sm font-medium'>| </span>
            <span className='text-xs font-medium md:text-sm'>
              {totalDownvote}
            </span>
          </button>
        </div>
        {auth.user.id === user.id && (
          <Link
            href={route('question.edit', id)}
            className='order-1 flex items-center gap-1 text-sm font-medium text-neutral-500 sm:order-2'
          >
            <FaPenToSquare className='h-5 w-5' /> Edit Pertanyaan
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
