import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { FaArrowDown, FaArrowUp, FaQuestion } from 'react-icons/fa'
import CardCategory from '../CardCategory'
import { Link } from '@inertiajs/react'
import { Question } from '@/types/question'
import { IoPersonCircle } from 'react-icons/io5'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import clsxm from '@/lib/clsxm'

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({
  question: {
    title,
    categories,
    user,
    content,
    createdAt,
    isCorrect,
    slug,
    imageUrl,
    upvote,
    downvote,
    answers,
  },
}: QuestionCardProps) {
  return (
    <Card
      className={clsxm(
        'relative mb-6 border px-5 py-4',
        isCorrect ? 'border-success' : 'border-transparent',
      )}
    >
      <div className='absolute right-6 top-0 rounded-b-xl bg-primary-50 px-3 py-4 md:px-4 md:py-5'>
        <FaQuestion className='h-5 w-4 fill-primary-500' />
      </div>
      <Link href={`/question/${slug}`}>
        <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
          <h1 className='max-w-[90%] text-lg font-semibold text-foreground-500 md:text-2xl'>
            {title}
          </h1>
          <div className='flex flex-wrap'>
            {categories?.map((category) => (
              <CardCategory key={category.id} category={category} />
            ))}
          </div>
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
          <div className='flex flex-col md:flex-row'>
            {imageUrl && (
              <div className='mb-3 h-64 overflow-hidden md:h-24'>
                <img
                  alt='Card background'
                  className='h-64 w-full rounded object-cover md:h-24 md:w-28'
                  src={imageUrl}
                  height={256}
                />
              </div>
            )}
            <div className='md:ml-4 md:mt-0 md:w-[80%]'>
              <p className='line-clamp-4 text-sm'>{content}</p>
            </div>
          </div>
        </CardBody>
      </Link>
      <CardFooter className='mt-3 flex items-center justify-between rounded-3xl bg-neutral-50 px-2 py-2'>
        <button className='ml-4 text-sm font-medium text-neutral-700'>
          {answers?.length ?? 0} Jawaban
        </button>
        <div className='flex items-center'>
          <button className='mr-2 flex items-center rounded-xl bg-primary-50 px-2 py-1'>
            <FaArrowUp className='h-3 fill-primary-500' />
            <p className='text-sm font-medium text-primary-500'>Dukung</p>
            <span className='mx-1 text-sm font-medium text-neutral-600'>
              |{' '}
            </span>
            <span className='text-xs font-medium text-neutral-600 md:text-sm'>
              {upvote}
            </span>
          </button>
          <button className='flex items-center rounded-xl bg-foreground-50 px-2 py-1'>
            <FaArrowDown className='h-3 fill-neutral-700' />
            <span className='mx-1 text-sm font-medium text-neutral-600'>
              |{' '}
            </span>
            <span className='text-xs font-medium text-neutral-600 md:text-sm'>
              {downvote}
            </span>
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}