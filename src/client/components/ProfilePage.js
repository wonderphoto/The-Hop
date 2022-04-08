import React from 'react'
import { Header } from './Header'
import { SavedEventsContainer } from './profilepage/SavedEventsContainer'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = ({ user, setUser }) => {
  return (
    <div className='flex flex-col h-[40rem]'>
      <Header user={ user } setUser={ setUser } />
        <div className="font-serif">
          <div className="inline-flex flex-col h-[40rem] w-1/2 overflow-y-auto">
            <SavedEventsContainer user={user} />
          </div>
          <div className="inline-flex flex-col h-[40rem] w-1/2 overflow-y-auto"> 
            <ScheduleCard />
          </div>
        </div>
      <Footer />
    </div>
  )
}
