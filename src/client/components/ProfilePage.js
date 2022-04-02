import React from 'react'
import { ProfileCard } from './profilepage/ProfileCard'
import { Header } from '../components/Header'
import { SavedEventsCard } from './profilepage/SavedEventsCard'
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
  
