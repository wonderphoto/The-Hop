import React from 'react'
import { EventCard } from './EventCard';

export const EventsContainer = ({ apiEvents, user }) => {
    const numEvents = apiEvents.length;
    return (
        <div className="h-auto bg-neutral-50 relative">
            {apiEvents.length > 0 ?
                <div className="border-b py-0.5 flex justify-around  bg-sky-100 ">
                    <p className='text-md font-medium text-gray-600'>No. of events found: <span className="font-semibold text-cyan-800">{numEvents}</span></p>
                </div>
                :
                <div className="py-0.5 flex justify-around bg-sky-100 ">
                    <p className='font-medium text-md text-gray-600'>Please enter a query above to see events</p>
                </div>
            }

            {apiEvents.length > 0 ?
                <div className='p-4 h-[68vh] space-y-2 overflow-y-scroll relative'>
                    {apiEvents.map((event, index) => (
                        <EventCard event={event} cardId={index} key={index} user={user} num={index + 1}></EventCard>
                    ))
                    }
                </div>
                :
                <div className='flex pl-16 pt-10 h-[70vh] w-85 bg-neutral-50'>
                    <a>
                        <img
                            className="h-[30vh]"
                            src="https://c.tenor.com/dpA4H0yTPooAAAAM/bunny-running.gif"
                            id="bunny"
                            alt="" />
                    </a>
                </div>
            }


            {/* https://media0.giphy.com/media/fUSQGDRvuBlQXcX0TA/200.webp?cid=ecf05e47ry7vnhwjqyngbdp5snx8gwdbxxm6pchbd9xwsvpe&rid=200.webp&ct=g */}

            {/* src="https://37.media.tumblr.com/c80108b25779bef2f4ff5910c18c5d54/tumblr_n4xj70zUFr1r1069oo1_500.gif  */}
        </div>
    )
}
