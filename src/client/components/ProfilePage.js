import React from 'react'
import { Header } from './Header'
import { ProfileCard } from './profilepage/ProfileCard'
import { SavedEventsContainer } from './profilepage/SavedEventsContainer'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = ({ user, setUser }) => {
  return (
    <div className='flex flex-col h-screen'>
      <Header user={ user } setUser={ setUser } />
        <div className="font-serif">
          <div className="inline-flex flex-col justify-items-start h-screen w-1/2">
            <ProfileCard />
            <SavedEventsContainer user={user} />
          </div>
          <div className="inline-flex flex-col justify-end h-screen justify-end w-1/2"> 
            <ScheduleCard />
          </div>
        </div>
      <Footer />
    </div>
  )
}


