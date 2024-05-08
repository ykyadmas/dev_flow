"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import PostSchema from './postSchema';
import axios from 'axios';

    type FormValues = {
        title:string,
        detail:string,
      };
      const PostForm = () => {

        // const {data:session}=useSession()
        const router=useRouter()
        const {
          register,
          handleSubmit,
          formState: { isSubmitting },
        } = useForm<FormValues>({
          resolver: zodResolver(PostSchema),
        });
      
        const handleOnSubmit=(handleSubmit(async(data)=>{
          try {
            await axios.post('/api/post/',data)
            console.log(data)
            router.push('/') 
            router.refresh()  
          } catch (error) {
            console.log(error)
          }    
        }))
  return (
    <div>
       <form onSubmit={handleOnSubmit}>
       <input 
       {...register('title')}
       type="text" 
       placeholder="Write Title of the Posts" 
       className="input input-ghost w-full max-w-xs"/>
        <textarea 
        {...register('detail')}
        className="textarea textarea-bordered" 
        placeholder="Write Posts"></textarea>
        <button type="submit">{isSubmitting ? "Posting..." : "Post"}</button>
       </form>
    </div>
  )
}

export default PostForm