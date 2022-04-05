import React from 'react'
import { Header } from './Header'
import { ProfileCard } from './profilepage/ProfileCard'
import { SavedEventsCard } from './profilepage/SavedEventsCard'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
        <div className="">
          <div className="inline-flex flex-col justify-items-start h-screen w-1/2">
            <ProfileCard />
          < SavedEventsCard />
          </div>
          <div className="inline-flex flex-col justify-end h-screen justify-end w-1/2"> 
            <ScheduleCard />
          </div>
        </div>
      <Footer />
    </div>
  )
}
