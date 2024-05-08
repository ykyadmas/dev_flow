"use client"
import React from 'react';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import AnswerSchema from '@/lib/Schema/AnswerSchema';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

interface Props{
questionId:number,
}

const AnswersForm= ({questionId}:Props) => {

  const {data:session}=useSession()
  
  const router=useRouter()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(AnswerSchema),
  });


  const handleOnSubmit=(handleSubmit(async(data)=>{
    try {
      await axios.post('/api/answer/', { ...data, questionId }); 
      console.log(data)
      router.push('/') 
      router.refresh()  
    } catch (error) {
      console.log(error)
    }    
  }))
  return (
    <div>
      <form className="flex w-full flex-col gap-3" onSubmit={handleOnSubmit}>
        <label className="font-semibold text-black">
        Write Your Answer <span className="text-red-500">*</span>
        </label>
        <Controller
        name='content'
        control={control}
        render={({field})=><SimpleMDE  placeholder='Answer The Question' {...field}/>}
        />
        <div className="label">
        </div>
        {/* Other form elements */}
        {session && session.user ? (
             <button 
             className='btn border-t-orange-500' type="submit">{isSubmitting ? "Submitting..." : "Submit"}</button>
        ):(
          <Link className='btn btn-primary' href="/api/auth/signin/">Signin</Link>
        )}
      </form>
    </div>
  );
};

export default AnswersForm;
