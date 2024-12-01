import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Textarea,
} from '@nextui-org/react'
import Typography from './Typography'
import { Button } from './Button'

interface AnsweringCardProps {
  content?: string
  loadingSubmit?: boolean
  onCancel: () => void
  onSubmit: () => void
  setContent: (_value: string) => void
}
export default function AnsweringCard({
  content,
  loadingSubmit = false,
  onCancel,
  onSubmit,
  setContent,
}: AnsweringCardProps) {
  return (
    <Card className={`relative mb-6 border px-5 py-4`}>
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <Typography variant='t' weight='medium' className='text-foreground-500'>
          Jawaban Anda
        </Typography>
      </CardHeader>
      <CardBody className='overflow-hidden pb-6 md:flex'>
        <Textarea
          value={content}
          onInput={(e) => setContent?.(e.currentTarget.value)}
          className='max-w-full'
          classNames={{
            input: 'border-0 ring-0 focus:ring-0 focus:border-0',
          }}
        />
        <Typography variant='bs' className='text-neutral-500'>
          Tuliskan jawaban anda secara rinci dan berikan informasi yang dapat
          memperjelas untuk penanya
        </Typography>
      </CardBody>
      <CardFooter className='flex flex-col items-start gap-4 p-0 px-2 sm:flex-row sm:items-center'>
        <Button
          onClick={onSubmit}
          color='primaryGradient'
          className='w-auto'
          isLoading={loadingSubmit}
        >
          Jawab
        </Button>
        <Button
          onClick={onCancel}
          color='primary'
          variant='bordered'
          className='w-auto'
        >
          Batalkan
        </Button>
      </CardFooter>
    </Card>
  )
}
