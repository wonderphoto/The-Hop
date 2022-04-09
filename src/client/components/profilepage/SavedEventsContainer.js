import React from 'react'
import { SavedEventCard } from './SavedEventCard';
import { useState, useEffect } from 'react';

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database


export const SavedEventsContainer = ({ user, userEvents, setUserEvents }) => {


    return (
        <div className="flex w-full justify-center">
            <div className="p-6 rounded-lg shadow-lg w-full bg-gray-100 justify-center items-center text-center">
                {JSON.stringify(userEvents) !== JSON.stringify({}) ?
                    <h4 className="text-gray-900 mt-3 text-xl leading-tight font-bold mb-4 flex-center">Saved Events</h4>
                    :
                    <h4 className="text-gray-900 mt-3 text-xl leading-tight font-medium mb-4 flex-center">Please log in to see events</h4>
                }
                {JSON.stringify(userEvents) !== JSON.stringify({}) ? userEvents.map((event, index) => (
                    <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={userEvents} setUserEvents={setUserEvents}></SavedEventCard>
                )) : <div></div>}
            </div>
        </div>
    )
}
