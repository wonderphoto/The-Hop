import React from 'react'
import { ProfileCard } from './profilepage/ProfileCard'
import { Header } from './Header'
import { SavedEventsCard } from './profilepage/SavedEventsCard'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = () => {
  return (
    <div className='flex-col s12'>
      <Header />
        <div className="flex s5">
          <ProfileCard />
        </div>
        <div className="flex s5">
          <SavedEventsCard />
        </div>
        <div className="flex s7">
          <ScheduleCard />
        </div>
      <Footer />
    </div>
  )
}
