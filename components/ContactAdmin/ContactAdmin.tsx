"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import axios from 'axios'
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ContactSchema from './ContactSchema';

type FormValues = {
  messsage: string;
};

const QuestionForm= () => {
  const {data:session}=useSession()
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(ContactSchema),
  });

  const handleOnSubmit=(handleSubmit(async(data)=>{
    try {
      await axios.post('/api/contact/' ,data)
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
    <textarea 
  {...register('messsage')}
    className="textarea textarea-primary" 
    placeholder="Write Your Message"></textarea>
    
        {/* Other form elements */}
       {session && session.user ? (
        <>
         <button 
         className='btn border-t-orange-500' 
         type="submit">{isSubmitting ? "Submitting..." : "Submit"}
         </button>
         {/* <a href="mailto:yekoyeadmas@gmail.com"
         >
          Let&apos;s get in touch
       </a> */}
        </>
       ):(
         <Link className='btn btn-primary' href="/api/signin/">Signin</Link>
       )}
      </form>
    </div>
  );
};

export default QuestionForm;


