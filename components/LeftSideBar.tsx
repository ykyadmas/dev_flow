"use client"
import { sidebarLinks } from '@/constant'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSideBar = () => {
 const {data:session}=useSession()
 const pathname = usePathname()
  return (
    <section className='sticky left-0  top-0 mt-0 flex h-screen flex-col justify-between overflow-y-auto border-r border-black bg-amber-700 p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none'>
        <div className='mt-[-100px] flex flex-col gap-6'>
        {sidebarLinks.map((link)=>(
        <div key={link.label} className=' '>
            <Link className={`${pathname === link.route ? 'flex w-full flex-row rounded-full bg-orange-500 p-2' : 'flex w-full flex-row rounded-full bg-none p-2'}`} href={link.route} >
               
                <Image src={link.imgURL} className='' alt='image' width={24} height={24}/>
                <p className='ml-10'>{link.label}</p>
                </Link>
        </div>
      ))
      }
      {
        session && session.user? (
        <div className='flex'>
        <Link className='btn btn-primary' href="/api/auth/signout">
            signout
        </Link>
        </div>
        ) :(
            <Link className='btn btn-primary' href="/api/auth/signin">
            signin
        </Link>
        )
      }
        </div>
    </section>
  )
}

export default LeftSideBar