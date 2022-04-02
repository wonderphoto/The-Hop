import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Map } from './Map'
import { Footer } from './Footer';

export const Home = () => {
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
  