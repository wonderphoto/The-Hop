import React from 'react'
import {SearchBox} from  './SearchBox';
import {EventsContainer} from './EventsContainer'

export const Sidebar = ({apiEvents, setApiEvents}) => {

  return (
    <div className='flex-col h-auto w-1/3 border-2 border-red-300'>
      <div className="border-2 border-gray-300 flex">
        <p>Sidebar</p>
      </div>
      <SearchBox apiEvents = {apiEvents} setApiEvents={setApiEvents}/>
      <EventsContainer/>
    </div>
  )
}
