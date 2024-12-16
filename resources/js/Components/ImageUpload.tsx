import clsxm from '@/lib/clsxm'
import { Image } from '@nextui-org/react'
import { LucideImageUp } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

export default function ImageUpload({
  image = null,
  setImage = () => {},
}: {
  image?: string | null
  setImage?: (_image: string | null) => void
}) {
  const [preview, setPreview] = useState<string | null>(image)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target?.files as any)[0]
    setPreview(URL.createObjectURL(file))
    processBase64Image(file)
  }

  const processBase64Image = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreview(null)
    setImage(null)
  }

  return (
    <div className='flex w-full items-start gap-2'>
      <label
        htmlFor='dropzone-file'
        className={clsxm(
          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-dashed border-neutral-300 bg-white hover:bg-neutral-100',
          preview ? '' : 'h-64 w-full border-2',
        )}
      >
        <Image
          className={clsxm('object-cover', preview ? '' : 'hidden')}
          alt='Uploaded Image'
          src={preview || ''}
          height={256}
        />
        <div
          className={clsxm(
            'flex-col items-center justify-center pb-6 pt-5',
            preview ? 'hidden' : 'flex',
          )}
        >
          <LucideImageUp className='mb-4 h-8 w-8 text-neutral-500' />
          <p className='mb-2 text-center text-sm text-neutral-500'>
            <span className='font-semibold'>Klik untuk mengunggah gambar</span>{' '}
            atau tarik file ke sini
          </p>
          <p className='text-xs text-neutral-500'>
            SVG, PNG, JPG/JPEG (MAX. 2MB)
          </p>
        </div>
        <input
          id='dropzone-file'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleChangeImage}
        />
      </label>
      <IoIosCloseCircle
        className={clsxm(
          'h-6 w-6 cursor-pointer text-neutral-600 transition-colors hover:text-neutral-700',
          !preview && 'hidden',
        )}
        onClick={clearImage}
      />
    </div>
  )
}
