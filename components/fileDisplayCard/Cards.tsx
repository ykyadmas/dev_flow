import { FileText } from 'lucide-react'
import React from 'react'

interface fileProps{
    id:number
    title:string,
    content:string,
    imageUrl:String,
    uploader:{
        id:string,
        name:string,
        email:string,
    }
}

const Cards = ({title,content,imageUrl,uploader}:fileProps) => {
  return (
    <div className="card card-compact w-96 bg-gray-300 shadow-xl">
    <figure>
    <a
        className="flex items-center space-x-3 text-purple-600"
        target="_blank"
        href={imageUrl as string}
      >
        <FileText className='mt-2'/>
        <span>View PDF</span>
      </a>
      </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{content}</p>
      <p>{uploader.name}</p>
    </div>
  </div>
  )
}

export default Cards


