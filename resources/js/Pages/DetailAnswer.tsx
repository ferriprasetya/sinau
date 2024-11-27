import Layout from '@/Layouts/Layout'
import { Head, Link } from '@inertiajs/react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { Button } from '@/Components/Button'
import QuestionCardDetail from '@/Components/Questions/QuestionCardDetail'
import Typography from '@/Components/Typography'
import AnswerCard from '@/Components/AnswerCard'
import AnsweringCard from '@/Components/AnsweringCard'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
function DetailAnswer() {
  const QuestionCardData = [
    {
      title: 'How to create a new project in Laravel?',
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://i.pinimg.com/736x/62/7e/d6/627ed6d6af86d01d542cc2118273a429.jpg',
      text: 'Kak mau tanyaaa, itu cara nengahinnya gimana ya? dari kemarin proyek saya error terus',
      answered: 1,
      up: 10,
      down: 1,
    },
  ]
  const AnswerCardData = [
    {
      title: 'How to create a new project in Laravel?',
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      condition: 'AI',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://i.pinimg.com/736x/ec/b6/d5/ecb6d506aa4fa5d83def21187a00e942.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      answered: 1,
      up: 10,
      down: 1,
    },
    {
      title: 'How to create a new project in Laravel?',
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      condition: 'verified',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://i.pinimg.com/736x/e8/8b/26/e88b262066175531a3c4282e452c52f0.jpg',
      text: '/question/how-to-create-a-new-project-in-laravel',
      answered: 1,
      up: 10,
      down: 1,
    },
    {
      title: 'How to create a new project in Laravel?',
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      condition: 'unverified',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage: '',
      text: '/question/how-to-create-a-new-project-in-laravel',
      answered: 1,
      up: 10,
      down: 1,
    },
  ]

  const sortAAnswers = [
    {
      id: 1,
      text: 'Terlama',
    },
    {
      id: 2,
      text: 'Terbaru',
    },
    {
      id: 3,
      text: 'Paling Banyak Disukai',
    },
    {
      id: 4,
      text: 'Paling Sedikit Disukai',
    },
  ]

  const [isAnswerQuestion, setIsAnswerQuestion] = useState(false)
  const toggleAnswerQuestion = () => {
    setIsAnswerQuestion(!isAnswerQuestion)
  }

  return (
    <Layout>
      <Head title='Beranda' />
      <div className='container mx-auto mt-8 flex max-w-[1024px] flex-col items-start md:flex-row'>
        <Link href='/' className='mx-3 flex w-fit items-center gap-1'>
          <FaArrowLeft className='fill-neutral-600' />
          <Typography variant='t' weight='medium' className='text-neutral-700'>
            Kembali
          </Typography>
        </Link>
        <div className='space-y-8 px-4 sm:mx-auto'>
          <div className='flex w-full flex-col justify-between sm:flex-row sm:items-center md:gap-8'>
            <div className='order-2 sm:order-1'>
              <Breadcrumbs
                separator='/'
                itemClasses={{
                  separator: 'px-2',
                }}
              >
                <BreadcrumbItem>Pertanyaan</BreadcrumbItem>
                <BreadcrumbItem>hOW TO do fROM a To C</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className='order-1 my-3 self-end sm:order-2 sm:my-0'>
              <Button color='primaryGradient'>Buat Pertanyaan</Button>
            </div>
          </div>
          {QuestionCardData.map((card, index) => (
            <QuestionCardDetail
              key={index}
              title={card.title}
              profileImage={card.profileImage}
              author={card.author}
              badge={card.badge}
              score={card.score}
              timestamp={card.timestamp}
              cardImage={card.cardImage}
              text={card.text}
              answered={card.answered}
              up={card.up}
              down={card.down}
            />
          ))}

          <Typography
            variant='t'
            weight='medium'
            className='border-b border-neutral-200 pb-3 text-neutral-700'
          >
            12 Jawaban
          </Typography>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <Select
              label='Urutkan'
              className='order-2 max-w-44 sm:order-1'
              size='sm'
              classNames={{
                trigger: 'bg-white',
              }}
            >
              {sortAAnswers.map((sortAnswer) => (
                <SelectItem key={sortAnswer.id}>{sortAnswer.text}</SelectItem>
              ))}
            </Select>
            {!isAnswerQuestion && (
              <Button
                color='primaryGradient'
                className='order-1 sm:order-2'
                onClick={() => toggleAnswerQuestion()}
              >
                Jawab Pertanyaan
              </Button>
            )}
          </div>
          {isAnswerQuestion && (
            <AnsweringCard setIsAnswerQuestion={setIsAnswerQuestion} />
          )}
          {AnswerCardData.map((card, index) => (
            <AnswerCard
              key={index}
              condition={card.condition}
              profileImage={card.profileImage}
              author={card.author}
              badge={card.badge}
              score={card.score}
              timestamp={card.timestamp}
              cardImage={card.cardImage}
              text={card.text}
              answered={card.answered}
              up={card.up}
              down={card.down}
            />
          ))}
        </div>
      </div>
      <Head />
    </Layout>
  )
}

export default DetailAnswer
