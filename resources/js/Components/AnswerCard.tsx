import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { FaBrain, FaCheck } from 'react-icons/fa6'
import Typography from './Typography'

import { PiWarningCircleFill } from 'react-icons/pi'
import { useState } from 'react'

interface AnswerCardProps {
  key: number
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
  condition: string
}

export default function AnswerCard({
  key,
  profileImage,
  author,
  badge,
  score,
  timestamp,
  cardImage,
  text,
  up,
  down,
  condition,
}: AnswerCardProps) {
  const [isReadMore, setIsReadMore] = useState(false)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <Card
      key={key}
      className={`${condition == 'verified' ? `border-success-500` : condition == 'AI' ? 'border-primary-500' : 'border-neutral-500'} relative mb-6 border px-5 py-4`}
    >
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        {condition === 'AI' ? (
          <>
            <div className='absolute right-6 top-0 rounded-b-xl bg-primary-500 px-3 py-4 md:px-4 md:py-5'>
              <FaBrain className='h-6 w-6 fill-primary-50' />
            </div>
            <Typography
              variant='t'
              weight='medium'
              className='text-foreground-500'
            >
              Jawaban AI
            </Typography>
            <div className='flex items-center gap-1'>
              <Typography
                variant='bm'
                weight='medium'
                className='text-neutral-700'
              >
                Diperkuat oleh
              </Typography>
              <Image
                className='rounded-none'
                src='/images/answer/gemini.png'
                width={43}
                height={16}
                alt='Gemini'
              />
            </div>
          </>
        ) : (
          <>
            {condition === 'verified' ? (
              <div className='absolute right-6 top-0 rounded-b-xl bg-success-500 px-3 py-4 md:px-4 md:py-5'>
                <FaCheck className='h-6 w-6 fill-success-50' />
              </div>
            ) : (
              <div className='absolute right-6 top-0 rounded-b-xl border-x border-y border-neutral-400 bg-transparent px-3 py-4 md:px-4 md:py-5'>
                <FaCheck className='h-6 w-6 fill-neutral-600' />
              </div>
            )}
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
          </>
        )}
      </CardHeader>
      <CardBody className='overflow-hidden pb-6 md:flex'>
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
            <p className='text-lg md:text-medium'>
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
      <CardFooter className='flex flex-col items-start justify-between gap-4 rounded-3xl p-0 px-2 sm:flex-row sm:items-center'>
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
          <PiWarningCircleFill className='h-5 w-5' /> Laporkan Jawaban
        </button>
      </CardFooter>
    </Card>
  )
}
