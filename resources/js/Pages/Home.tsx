import Filter from '@/Components/Filter'
import Menu from '@/Components/Menu'
import QuestionCard from '@/Components/QuestionCard'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import { Button } from '@nextui-org/button'

export default function Home() {
  const cardData = [
    {
      title: 'How to create a new project in Laravel?',
      categories: ['Programming', 'Coding', 'Gabut', 'Ngeteh'],
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg',
      slug: '/question/how-to-create-a-new-project-in-laravel',
      answered: 1,
      up: 10,
      down: 1,
    },
    {
      title: 'How to create a new project in Laravel?',
      categories: ['Programming', 'Coding', 'Gabut', 'Ngeteh'],
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg',
      slug: '/question/how-to-create-a-new-project-in-laravel',
      answered: 1,
      up: 10,
      down: 1,
    },
    {
      title: 'How to create a new project in Laravel?',
      categories: ['Programming', 'Coding', 'Gabut', 'Ngeteh'],
      profileImage:
        'https://i.pinimg.com/736x/47/b8/68/47b8687e1a612547846960c69381aaaa.jpg',
      author: 'Ambatukam',
      badge: '/badges/contoh1.png',
      score: 10,
      timestamp: '1 hour ago',
      cardImage:
        'https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg',
      slug: '/question/how-to-create-a-new-project-in-laravel',
      answered: 1,
      up: 10,
      down: 1,
    },
  ]

  return (
    <Layout>
      <Head title='Beranda' />
      <div className='container mt-3 flex max-w-[1024px] px-4 sm:mx-auto'>
        <div className='hidden md:block md:w-1/3'>
          <Menu />
        </div>
        <div className='mx-auto md:w-2/3'>
          <div className='mt-8 flex justify-between'>
            <h1 className='text-2xl font-bold'>Semua pertanyaan</h1>
            <Button color='primary'>Buat Pertanyaan</Button>
          </div>
          <Filter />
          <div className='mt-8'>
            {cardData.map((card, index) => (
              <QuestionCard
                key={index}
                title={card.title}
                categories={card.categories}
                profileImage={card.profileImage}
                author={card.author}
                badge={card.badge}
                score={card.score}
                timestamp={card.timestamp}
                cardImage={card.cardImage}
                slug={card.slug}
                answered={card.answered}
                up={card.up}
                down={card.down}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
