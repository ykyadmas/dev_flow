"use client"
import { UploadDropzone } from '@/components/utils/uploadthing'
import uploadSchema from '@/lib/Schema/upload'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FileText } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'


const CreatePost = () => {
  const {data:session}=useSession()
  const router=useRouter()
  const[imageUrl,setImageUrl]=useState<null | string>(null)

  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({
    resolver: zodResolver(uploadSchema)
  })
  const onSubmitHandler=(handleSubmit(async(data)=>{
       await axios.post('/api/upload/',{...data,imageUrl})
             router.push('/fileUpload')
             router.refresh()
  }))
  return (
    <div className='flex justify-between'>
     <form onSubmit={onSubmitHandler}>
     <div>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Title</span>
  </div>
  <input 
  type="hidden" 
  {...register('imageUrl')}
  name='imageUrl'
  placeholder="Type here" 
  className="" />
  <input 
  type="text" 
  {...register('title')}
  placeholder="Type here" 
  className="input input-bordered w-full max-w-xs" />
   
</label>
<label className="form-control">
  <div className="label">
    <span className="label-text">content Here</span>
  </div>
  <textarea 
  {...register('content')}
  className="textarea textarea-bordered h-24" 
  placeholder="Write the File content Here"></textarea>

</label>

      </div>
      <div>
       {imageUrl === null ? (
         <UploadDropzone endpoint='pdfUploader'
         onClientUploadComplete={(res)=>{
           setImageUrl(res[0].url)
         }}
         onUploadError={()=>{
          alert("Error");
         }}
         />
       ):(
        <a
        className="flex items-center space-x-3 text-purple-600"
        target="_blank"
        href={imageUrl}
      >
        <FileText />
        <span>View PDF</span>
      </a>
      )}
      </div>
      {session && session.user ? (
        <button 
        type='submit' 
        className="btn border-orange-800">{isSubmitting ? "Submitting..." : "Submit"}</button>
      ):(
        <Link className='btn btn-primary' href="/api/auth/signin/">Signin</Link>
      )}
     </form>
<div>
<ul> 
  {/* <h1 className='border border-b-amber-800 text-3xl font-bold'>POSTS</h1> */}
  {/* {data.map((datas)=>(
    <li key={datas.id}>{datas.id}. {datas.title}</li>
  ))} */}
</ul>
</div>
    </div>
  )
}

export default CreatePost