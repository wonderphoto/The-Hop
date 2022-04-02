import React from 'react'
import { Header } from './homepage/HomeHeader'
import { Sidebar } from './homepage/Sidebar'
import { Map } from './homepage/Map'
import { Footer } from './homepage/Footer';

export const HomePage = () => {
  return (
    <div className='flex-col'>
      <Header />
      <div className="flex">
        <Sidebar />
        {/* <ProfileCard />  */}
        <Map />
      </div>
      <Footer />
    </div>
  )
}
