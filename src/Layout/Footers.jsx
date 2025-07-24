import { Facebook, FacebookIcon, ImageIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
// import { assets } from '../assets/assets'

const Footers = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center p-4 bg-base-100 shadow-lg mt-10'>
     <div className='w-full flex justify-start items-center p-4 bg-base-100 gap-4 sm:gap-8'>
       <div className='flex flex-start items-center gap-1.5 cursor-default' onClick={()=>navigate("/")}>
        <ImageIcon className='size-4 sm:size-6 text-info'/>
        <span className='text-xs sm:text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>ImagiFy</span>
      </div>
      <div className='h-4 w-0 border-1 border-black'></div>
      <p className='text-xs sm:text-xl text-base-content/40'>All right reserved. Copyright @imagify</p>
     </div>
      <div className='flex items-center gap-4'>
        <Link to="https://www.facebook.com/pushpam.kumar.1428921/" className='border-1 border-base-content/70 rounded-full p-2 hover:scale-105 transition-all duration-300'>
          <FacebookIcon className='size-4 sm:size-6 text-info cursor-pointer' />  
        </Link>
        <Link to="https://x.com/Undrrtd__?t=VKaZ_r6l5VVueIVr21Xhiw&s=09" className='border-1 border-base-content/70 rounded-full p-2 hover:scale-105 transition-all duration-300'>
          <TwitterIcon className='size-4 sm:size-6 text-info cursor-pointer' />  
          </Link>
        <Link to="https://www.instagram.com/undrrtd__/" className='border-1 border-base-content/70 rounded-full p-2 hover:scale-105 transition-all duration-300'>
          <InstagramIcon className='size-4 sm:size-6 text-info cursor-pointer' />  
          </Link>
      </div>
    </div>
  )
}

export default Footers
