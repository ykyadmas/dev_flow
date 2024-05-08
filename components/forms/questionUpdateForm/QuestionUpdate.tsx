"use client"
import React from 'react';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import QuestionSchema from '@/lib/Schema/Validation';
import 'easymde/dist/easymde.min.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic'
import { Question } from '@prisma/client';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type FormValues = {
  title: string;
  content: string;
};

const QuestionUpdateForm= ({question}:{question:Question}) => {
  const router=useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(QuestionSchema),
  });

  const handleUpdate=(handleSubmit(async(data)=>{
    try {
        if(question)
      await axios.patch('/api/question/'+question.id, data)
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
          Question Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('title')}
          defaultValue={question.title}
          placeholder="Write Title Here"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="label">
          <span className="label-text-alt text-gray-400">
            Question Title Description
          </span>
        </div>
        <label className="font-semibold text-black">
         Detail Explanation <span className="text-red-500">*</span>
        </label>
        <Controller
        defaultValue={question.content}
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
        <button className='btn border-t-orange-500' type="submit">{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default QuestionUpdateForm;
