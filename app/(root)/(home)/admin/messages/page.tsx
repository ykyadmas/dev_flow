import { PrismaClient } from '@prisma/client'
import React from 'react'

const prisma=new PrismaClient()

const page = async() => {

const displayMessage=await prisma.contact.findMany({
    'orderBy':{
        'createdAt': 'desc'
    },
    include:{
        sender:true
    }
})

  return (
    <div className="overflow-x-auto">

    <table className="table">

      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
      </thead>

{displayMessage.map(message=>(
 <tbody key={message.id}>
 <tr>
   <th>{message.id}</th>
   <td>{message.sender?.name}</td>
   <td>{message.sender?.email}</td>
   <td>{message.messsage}</td>
 </tr>
 

</tbody>
))}

     
    </table>
  </div>
  )
}

export default page