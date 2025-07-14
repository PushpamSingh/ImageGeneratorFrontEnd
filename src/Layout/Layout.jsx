import React from 'react'
import Headers from './Headers'
import { Outlet } from 'react-router-dom'
import Footers from './Footers'

const Layout = () => {
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 min-h-screen w-full overflow-x-hidden font-[outfit]' data-theme='dark'>
        <header>
          <Headers/>
        </header>
        <main className='w-full mt-2 sm:mt-4 md:mt-8 lg:mt-12 xl:mt-16'>
            <Outlet/>
        </main>
        <footer>
          <Footers/>
        </footer>
    </div>
  )
}

export default Layout
