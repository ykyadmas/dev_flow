"use client"
import { useSession } from 'next-auth/react'
import MobileView from './MobileView'
import Link from 'next/link'
import GlobalSearch from './GlobalSearch'

const Navbar = () => {
  
    const {data:session }=useSession()
  return (
<div className="navbar bg-gradient-to-r from-yellow-100 via-amber-400 to-amber-300">
<MobileView/>
  <div className="visible flex-1 sm:invisible lg:visible">
    <h1 className="btn btn-ghost text-xl">EthioDevHub</h1>
  </div>
 
  <div className="flex-none">
    <GlobalSearch/>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge indicator-item badge-sm">8</span>
        </div>
      </div>
    </div>
    {session && session.user ? (
   <div className="dropdown dropdown-end">

   <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
     <div className="w-10 rounded-full">
       <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
     </div>
   </div>
   <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
     <li>
       <Link href='' className="justify-between">
         Profile
       </Link>
     </li>
     <li><p>Settings</p></li>
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