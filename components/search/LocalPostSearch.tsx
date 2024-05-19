"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const LocalPosteSearch = () => {
  const searchparams=useSearchParams();
  const pathName=usePathname();
  const {replace}=useRouter()
  const handleSearch=(term: string)=> {
    console.log(term);
    const params=new URLSearchParams(searchparams)
    if(term){
      params.set('query',term)
    }else{
      params.delete('query')
    }
    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className='flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4'>
   <form>
   <input 
    type="text" 
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search Post" 
    defaultValue={ searchparams.get('query')?.toString()}
    className="input input-bordered 
    input-primary w-full max-w-xs border-none shadow-none outline-none" />
   </form>
    </div>
  )
}

export default LocalPosteSearch