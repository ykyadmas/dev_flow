import QuestionForm from '@/components/forms/QuestionForm'
import { Metadata } from 'next'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1 className='font-bold text-black'>Ask a question</h1>
        <div className='mt-10'>
           <QuestionForm/> 
        </div>
    </div>
  )
}

export const metadata:Metadata={
  title:"Ask any Question",
  description:"View Ask Questions Page"
}

export default page

