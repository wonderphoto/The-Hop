import React from 'react'

export const EventCard = ({ event }) => {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white min-w-[23rem]">
                {/* <a href="#!">
                    <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
                </a> */}
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{event.title}</h5>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md">
                            Category
                        </p>
                        <p className="text-gray-700">{event.category}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md">
                            Labels
                        </p>
                        <p className="text-gray-700">{event.labels.slice(0, 2).join(', ')}</p>
                    </div>
                    {event.phq_attendance > 0 ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md">
                                Predicted Attendance
                            </p>
                            <p className="text-gray-700">{event.phq_attendance}</p>
                        </div> :
                        <></>
                    }
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md">
                            Start Time
                        </p>
                        <p className="text-gray-700">{event.start}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md">
                            End Time
                        </p>
                        <p className="text-gray-700">{event.end}</p>
                    </div>
                    {event.entities[0].name ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md">
                                Venue
                            </p>
                            <div className="flex">
                                <div className='px-4'></div>
                                <p className="text-gray-700 text-end">{event.entities[0].name}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {event.entities[0].formatted_address ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md">
                                Address
                            </p>
                            <div className="flex">
                                <div className='px-2.5'></div>
                                <p className="text-gray-700 text-sm text-end">{event.entities[0].formatted_address}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }


                    <button type="button" className=" mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Save Event</button>
                </div>
            </div>
        </div>
    )
}
