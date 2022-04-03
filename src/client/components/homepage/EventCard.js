import { Events } from 'pg'
import React from 'react'

export const EventCard = ({ event }) => {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm min-w-sm">
                {/* <a href="#!">
                    <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
                </a> */}
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{event.title}</h5>
                    <div className='w-full flex'>
                        <p className="text-gray-700 text-md justify-between">
                            Category
                        </p>
                        <p>{event.category}</p>
                    </div>

                    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Save Event</button>
                </div>
            </div>
        </div>
    )
}
