import React from 'react'



export const EventCard = ({ event, cardId, user }) => {

    // converts date string into a local date time format, removes the last 21 characters
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US').slice(0, 21);
    }
    const startTime = timeConverter(event.start);
    const endTime = timeConverter(event.end);

    // extracting values from event to save into database
    const eventid = event.id;
    const title = event.title;
    const category = event.category;
    const labels = event.labels;
    const description = event.description;
    const predicted_attendance = event.phq_attendance;
    const latitude = event.location[1];
    const longitude = event.location[0];
    const start_time = event.start;
    const privateVal = event.private;
    const local_rank = event.local_rank;
    const rank = event.rank;

    const saveEvent = () => {
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: user.userid, // in case we need to get userid from state instead of session
                eventid: eventid,
                title: title,
                category: category,
                labels: labels,
                description: description,
                predicted_attendance: predicted_attendance,
                latitude: latitude,
                longitude: longitude,
                start_time: start_time,
                private: privateVal,
                rank: rank,
                local_rank: local_rank
            }),
        }).then(response => response.json())
            .then(data => {
                console.log('event saved: ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white min-w-[23rem]">
                {/* <a href="#!">
                    <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
                </a> */}
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-semibold mb-2">{event.title}</h5>
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
                        <p className="text-gray-700">{startTime}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md">
                            End Time
                        </p>
                        <p className="text-gray-700">{endTime}</p>
                    </div>
                    {event.entities[0] ?
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
                    {event.entities[0] ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md">
                                Address
                            </p>
                            <div className="flex">
                                <div className='px-2.5'></div>
                                <p className="text-gray-700 text-sm text-end">{event.entities[0].formatted_address.slice(0, -30)}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    <div className='flex justify-between mx-4'>
                        {event.description ?
                            <button
                                className="px-4 py-2 mt-4 rounded-md text-gray-600 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out
                                                "data-bs-toggle="collapse" data-bs-target={`#descriptionCollapse${cardId}`} aria-expanded="false" aria-controls={`descriptionCollapse${cardId}`}>
                                Extra Info
                            </button>
                            :
                            <div></div>}
                        {JSON.stringify(user) === JSON.stringify({}) ?
                            <button type="button" className=" cursor-not-allowed opacity-50 mt-4 text-white inline-block px-6 py-2.5 bg-emerald-600 font-medium text-xs leading-tight uppercase rounded shadow-md">
                                Save Event</button>
                            :
                            <button type="button" className=" mt-4 inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-800 hover:shadow-lg focus:bg-emerald-800
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => saveEvent()}>
                                Save Event</button>
                        }

                    </div>
                    <div className="collapse" id={`descriptionCollapse${cardId}`}>
                        <div className="block p-6 rounded-lg shadow-lg bg-white">
                            {event.description}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
