import React from 'react'
import { SavedEventCard } from './SavedEventCard';
import { useState, useEffect } from 'react';

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database

const userEvents = {};

export const SavedEventsContainer = ({ user }) => {
    const [userEvents, setUserEvents] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/api/events', {
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
    }, [JSON.stringify(userEvents)])

    //if we are logged in then we fetch from DB


    return (
        <div className="inline-flex h-screen border-2 border-red-300 justify-center overflow-y-auto">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-4 flex">Saved Events</h5>
                {/* <p className="list-item text-gray-700 text-base mb-4">

                    </p>
                    <p className="list-item text-gray-700 text-base mb-4">

                    </p> */}

                {JSON.stringify(userEvents) !== JSON.stringify({}) ? userEvents.map((event, index) => (
                    <SavedEventCard event={event} cardId={index} key={index} user={user} userEvents={userEvents} setUserEvents={setUserEvents}></SavedEventCard>
                )) : <div></div>}
            </div>
        </div>
    )
}
