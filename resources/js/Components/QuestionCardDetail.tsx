import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6'
import Typography from './Typography'

interface QuestionCardProps {
  key: number
  title: string
  profileImage?: string
  author: string
  badge: string
  score: number
  timestamp: string
  cardImage?: string
  text: string
  answered: number
  up: number
  down: number
}

export default function QuestionCardDetail({
  key,
  title,
  profileImage,
  author,
  badge,
  score,
  timestamp,
  cardImage,
  text,
  up,
  down,
}: QuestionCardProps) {
  const [isReadMore, setIsReadMore] = useState(false)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <Card key={key} className='relative mb-6 px-5 py-4'>
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <h1 className='text-lg font-semibold text-foreground-500 md:text-2xl'>
          {title}
        </h1>
        <div className='my-4 flex items-center'>
          <div className='mr-3'>
            <Image
              src={profileImage}
              className='h-9 w-9 rounded-full object-cover'
            />
          </div>
          <div>
            <div className='flex items-center'>
              <h2 className='text-medium font-semibold text-foreground-500 md:text-lg'>
                {author}
              </h2>
              <Image src={badge} className='h-5 w-5' />
              <span className='text-medium font-medium text-secondary-500 md:text-lg'>
                {score}
              </span>
            </div>
            <span className='text-xs font-normal text-neutral-600 md:text-sm'>
              {timestamp}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-hidden py-2 md:flex'>
        <div className='flex flex-col'>
          {cardImage && (
            <div className='mb-3 h-52 overflow-hidden'>
              <img
                alt='Card background'
                className='h-52 w-auto rounded object-cover'
                src={cardImage}
                height={256}
              />
            </div>
          )}
          <div className=''>
            <p className='text-lg'>
              {text.length > 300 && !isReadMore ? (
                <>
                  {text.slice(0, 300)}...
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
                  {text}
                </Typography>
              )}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className='mt-3 flex flex-col items-start justify-between gap-4 rounded-3xl px-2 py-2 sm:flex-row sm:items-center'>
        <div className='order-2 flex items-center sm:order-1'>
          <button className='mr-2 flex items-center rounded-xl bg-primary-50 px-2 py-1'>
            <FaArrowUp className='h-3 fill-primary-500' />
            <p className='text-sm font-medium text-primary-500'>Dukung</p>
            <span className='mx-1 text-sm font-medium text-neutral-600'>
              |{' '}
            </span>
            <span className='text-xs font-medium text-neutral-600 md:text-sm'>
              {up}
            </span>
          </button>
          <button className='flex items-center rounded-xl bg-foreground-50 px-2 py-1'>
            <FaArrowDown className='h-3 fill-neutral-700' />
            <span className='mx-1 text-sm font-medium text-neutral-600'>
              |{' '}
            </span>
            <span className='text-xs font-medium text-neutral-600 md:text-sm'>
              {down}
            </span>
          </button>
        </div>
        <button className='order-1 flex items-center gap-1 text-sm font-medium text-neutral-500 sm:order-2'>
          <FaPenToSquare className='h-5 w-5' /> Edit Pertanyaan
        </button>
      </CardFooter>
    </Card>
  )
}
