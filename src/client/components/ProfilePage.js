import React from 'react'
import { ProfileCard } from './profilepage/ProfileCard'
import { ProfileHeader } from './profilepage/HomeHeader'
import { SavedEventsCard } from './profilepage/Sidebar'
import { ScheduleCard } from './profilepage/ScheduleCard'


export const ProfilePage = () => {
    return (
         <div className='flex-col'>
        <ProfileHeader />
        <div className="flex">
          <ProfileCard /> 
          <SavedEventsCard />
          <ScheduleCard />
        </div>
        <Footer />
      </div>
    )
}
