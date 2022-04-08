import React from 'react'
import { SearchBox } from './SearchBox';
import { EventsContainer } from './EventsContainer'

export const Sidebar = ({ apiEvents, setApiEvents, user, setMapBase, mapRef, setCircleRadius }) => {

  return (
    <div className='flex-col h-auto w-1/3'>

      <SearchBox apiEvents={apiEvents} setApiEvents={setApiEvents} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
      <EventsContainer apiEvents={apiEvents} user={user} />
    </div>
  )
}
