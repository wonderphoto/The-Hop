import React from 'react'
import { SavedEventCard } from './SavedEventCard';
import { useState, useEffect } from 'react';

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database

const userEvents = {};

export const SavedEventsContainer = ({ user }) => {
    const [userEvents, setUserEvents] = useState({});

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
        <div className="inline-flex h-auto justify-center mt-10">
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-auto text-center">
                <h4 className="text-gray-900 text-xl leading-tight font-medium mb-4 flex-center">Saved Events</h4>
                {JSON.stringify(userEvents) !== JSON.stringify({}) ? userEvents.map((event, index) => (

                    <SavedEventCard event={event} cardId={index} key={index} user={user} userEvents={userEvents} setUserEvents={setUserEvents}></SavedEventCard>
                )) : <div></div>}
            </div>
        </div>
    )
}
