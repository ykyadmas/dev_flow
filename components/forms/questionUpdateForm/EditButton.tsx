"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const EditButton = ({QuestionId}:{QuestionId:number}) => {
  const{data:session}=useSession()
  return (
    <div>
   {session?.user?.name ? (
     <Link  href={`/question/${QuestionId}/editQuestion`} className='btn btn-primary'>Edit</Link>
   ):(
    <button></button>
   )}
    </div>
  )
}

export default EditButton