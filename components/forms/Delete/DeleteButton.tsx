"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteButton = ({QuestionId}:{QuestionId:number}) => {

const{data:session}=useSession()


const[error,setError]=useState(false)
const[isDeleting,setDeleting]=useState(false)

const router=useRouter()
const handleDelete=()=>{
    try {
        setDeleting(true)
        axios.delete(`/api/question/`+QuestionId)
        router.push('/question')
        router.refresh()
    } catch (error) {
        setDeleting(false)
        setError(true)
    }
}
  return (
    <div>
        {session?.user?.name ?(
          <button 
          onClick={handleDelete}>{isDeleting ? "Deleting... " : "Delete"}</button>
        ):(
          <button></button>
        )}
    </div>
  )
}

export default DeleteButton