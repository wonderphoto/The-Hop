import React from 'react'
import { SearchBox } from './SearchBox';
import { EventsContainer } from './EventsContainer'

export const Sidebar = ({ apiEvents, setApiEvents }) => {

  return (
    <div className='flex-col h-auto w-1/3 border-2 border-red-300'>

      <SearchBox apiEvents={apiEvents} setApiEvents={setApiEvents} />
      <EventsContainer apiEvents={apiEvents} />
    </div>
  )
}
