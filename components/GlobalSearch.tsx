import Image from 'next/image'
import React from 'react'

const GlobalSearch = () => {
  return (
    <div className='flex justify-between gap-2'>
       <div>
       <Image
        src='/assets/icons/search.svg'
        alt='search'
        width={25}
        height={25}
        className='mt-2'
        />
       </div>
         <div className="form-control">
        <input type="text"  placeholder="Search" className="input input-bordered w-24 md:w-auto" />
      </div>
    </div>
   
  )
}

export default GlobalSearch