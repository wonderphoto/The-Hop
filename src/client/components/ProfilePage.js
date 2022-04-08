import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { SavedEventsContainer } from './profilepage/SavedEventsContainer'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = ({ user, setUser }) => {
  const [userEvents, setUserEvents] = useState([]);

  let backendUrl = new URL("http://localhost:3000/api/events");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendUrl.search = new URLSearchParams({ userid: user.userid }).toString();
  }

  console.log('user object is, ', user);
  useEffect(() => {
    fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        setUserEvents(data);
        console.log("userEvents = ", userEvents);
      })
      .catch(err => {
        console.log(err);
      })

    // re-render page when the apiEvents object or when user logs in or out changes.
    console.log("useEffect in savedEventsContainer is fired, reloaded page due to change in apiEvents")
  }, [JSON.stringify(userEvents), JSON.stringify(user)])

  //if we are logged in then we fetch from DB



  return (
    <div className='flex flex-col h-30'>
      <Header user={user} setUser={setUser} />
      <div className="font-serif">
        <div className="inline-flex flex-col h-[63rem] w-1/2 overflow-y-auto">
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
