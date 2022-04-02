import React from 'react'
import { Header } from './Header'
import { ProfileCard } from './profilepage/ProfileCard'
import { SavedEventsCard } from './profilepage/SavedEventsCard'
import { ScheduleCard } from './profilepage/ScheduleCard'


export const ProfilePage = () => {
  return (
    <div className='flex-col'>
      <Header />
        <div className="flex-direction: row">
          <ProfileCard />
          <ScheduleCard />
          <SavedEventsCard />
        </div>
      <Footer />
    </div>
  )
}


