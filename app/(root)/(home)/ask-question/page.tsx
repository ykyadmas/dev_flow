import QuestionForm from '@/components/forms/QuestionForm'
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

export default page