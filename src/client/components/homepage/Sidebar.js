import React from 'react'
import { SearchBox } from './SearchBox';
import { EventsContainer } from './EventsContainer'

export const Sidebar = ({ apiEvents, setApiEvents, user, setMapBase, mapRef, setCircleRadius }) => {

  return (
<<<<<<< HEAD
    <div className='flex-col h-auto w-1/3'>
||||||| constructed merge base
    <div className='flex-col h-auto w-1/3 border-2 border-red-300'>
=======
    <div className='flex-col h-auto w-1/3 border-r-4 border-gray-300'>
>>>>>>> increased limit per api call to 30

      <SearchBox apiEvents={apiEvents} setApiEvents={setApiEvents} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
      <EventsContainer apiEvents={apiEvents} user={user} />
    </div>
  )
}
