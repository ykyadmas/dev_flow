"use client"
import { useSession } from 'next-auth/react'
import MobileView from './MobileView'
import Link from 'next/link'

const Navbar = () => {
  
    const {data:session}=useSession()
  return (
<div className="navbar bg-gradient-to-r from-yellow-100 via-amber-400 to-amber-300">
<MobileView/>
  <div className="visible flex-1 sm:invisible lg:visible">
  <h1 className="btn btn-ghost invisible flex items-center justify-center text-xl sm:visible sm:ml-20">
  EthioDevHub
</h1>

  </div>
 
  <div className="flex-none">
   
    {session && session.user ? (
   <div className="dropdown dropdown-end">

   <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
     <div className="w-10 rounded-full border border-slate-800">
       <p>{session.user.name}</p>
     </div>
   </div>
   <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
     <li>
       <Link href='' className="justify-between">
       <p>{session.user.name}</p>
       </Link>
     </li>
     <li><Link href="/api/auth/signout">Logout</Link></li>
   </ul>
 </div>
    ):(
    <Link href="/api/auth/signin" className='btn btn-primary'>signin</Link>
    )}
  </div>
</div>



)
}

export default Navbar