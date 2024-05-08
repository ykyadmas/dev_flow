"use client"
import React from 'react';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic'
import { Answer } from '@prisma/client';
import AnswerSchema from '@/lib/Schema/AnswerSchema';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type FormValues = {
  content: string;
};

const AnswerUpdate= ({answer}:{answer:Answer}) => {
  const router=useRouter()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(AnswerSchema),
  });

  const handleUpdate=(handleSubmit(async(data)=>{
    try {
        if(answer)
      await axios.patch('/api/answer/'+answer.id, data)
      router.push('/') 
      router.refresh()  
    } catch (error) {
      console.log(error)
  }    
  }))
  return (
    <div>
      <form className="flex w-full flex-col gap-3" onSubmit={handleUpdate}>
       
        <label className="font-semibold text-black">
         Detail Explanation <span className="text-red-500">*</span>
        </label>
        <Controller
        defaultValue={answer.content}
        name='content'
        control={control}
        render={({field})=><SimpleMDE placeholder='Detail Decsription' {...field}/>}
        />
        <div className="label">
          <span className="label-text-alt text-gray-400">
            Add up to 3 tags to describe what your question is about. Press Enter to add a tag.
          </span>
        </div>
        {/* Other form elements */}
        <button className='btn border-t-orange-500' type='submit'>{isSubmitting ? "Editing..." : "Edit"}</button>
      </form>
    </div>
  );
};

export default AnswerUpdate;
