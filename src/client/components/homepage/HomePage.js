import React from 'react'
import { Header } from './HomeHeader'
import { Sidebar } from './Sidebar'
import { Map } from './Map'
import { Footer } from './Footer';

export const HomePage = () => {
  return (
    <div className='flex-col'>
      <Header />
      <div className="flex">
        <Sidebar />
        <Map />
      </div>
      <Footer />
    </div>
  )
}
