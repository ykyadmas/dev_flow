

import Link from 'next/link'
import React from 'react'

const EditAnswerButton = ({AnswerId}:{AnswerId:number}) => {
  return (
    <div>
        <Link href={`/editAnswers/${AnswerId}`} className='btn btn-success'>Edit</Link>
    </div>
  )
}

export default EditAnswerButton