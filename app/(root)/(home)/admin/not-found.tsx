import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div>
      The requested page doesn&apos;t exist.
    <Link className='btn btn-primary' href="/">Back to Home</Link>
    </div>
  )
}

export default NotFoundPage