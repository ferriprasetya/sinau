import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

export default function QuestionCardLoading() {
  return (
    <Card className='relative mb-6 px-5 py-4'>
      <Skeleton className='absolute right-6 top-0 rounded-b-xl bg-neutral-100 px-3 py-4 md:px-4 md:py-5'>
        <div className='h-5 w-4 rounded-lg bg-neutral-500'></div>
      </Skeleton>
      <div>
        <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-7 w-full rounded-lg bg-neutral-500'></div>
          </Skeleton>
          <div className='flex flex-wrap gap-1'>
            <Skeleton className='my-1 rounded-lg'>
              <div className='h-4 w-20 rounded-lg bg-neutral-500'></div>
            </Skeleton>
            <Skeleton className='my-1 rounded-lg'>
              <div className='h-4 w-20 rounded-lg bg-neutral-500'></div>
            </Skeleton>
          </div>
          <div className='my-4 flex items-center'>
            <div className='mr-3'>
              <Skeleton className='rounded-full'>
                <div className='h-9 w-9 rounded-full bg-neutral-500'></div>
              </Skeleton>
            </div>
            <div>
              <div className='mb-1 flex items-center'>
                <Skeleton className='w-32 rounded-lg'>
                  <div className='h-5 rounded-lg bg-neutral-500'></div>
                </Skeleton>
              </div>

              <Skeleton className='w-24 rounded-lg'>
                <div className='h-4 rounded-lg bg-neutral-500'></div>
              </Skeleton>
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-hidden py-2 md:flex'>
          <div className='flex flex-col md:flex-row'>
            <Skeleton className='w-full rounded max-md:mb-2 md:w-28'>
              <div className='h-24 rounded bg-neutral-500'></div>
            </Skeleton>
            <div className='flex flex-col gap-1 md:ml-4 md:mt-0 md:w-[80%]'>
              <Skeleton className='w-full rounded-lg'>
                <div className='h-5 rounded-lg bg-neutral-500'></div>
              </Skeleton>
              <Skeleton className='w-full rounded-lg'>
                <div className='h-5 rounded-lg bg-neutral-500'></div>
              </Skeleton>
              <Skeleton className='w-4/5 rounded-lg'>
                <div className='h-5 rounded-lg bg-neutral-500'></div>
              </Skeleton>
            </div>
          </div>
        </CardBody>
      </div>
      <Skeleton className='mt-3 w-full rounded-3xl'>
        <div className='h-10 rounded-3xl bg-neutral-500'></div>
      </Skeleton>
    </Card>
  )
}
