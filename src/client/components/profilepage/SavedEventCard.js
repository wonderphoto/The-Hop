import React from 'react';



export const SavedEventCard = ({ event, cardId, user, userEvents, setUserEvents }) => {
    // const options = { }
    // converts date string into a local date time format, removes the last 21 characters
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", timeZoneName: "short" })
            ;
    }
    const startTime = timeConverter(event.start_time);
    const link = `https://www.google.com/search?q=${event.title}+${startTime}`;
    // console.log(event.start_time);
    // console.log(startTime);
    // console.log(user);
    // console.log("event.id" - event.id);

    const deleteEvent = () => {
        fetch('http://localhost:3000/api/events', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: user.userid, // in case we need to get userid from state instead of session
                eventid: event.eventid,
                username: user.username,
            }),
        }).then(response => response.json())
            .then(data => {
                console.log('event deleted: ', data);
                setUserEvents(userEvents.filter((e) => e.eventid !== event.eventid));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{event.title}</h5>
                <p className="text-gray-700 text-base mb-4">Starts at {startTime} at {event.address}</p>
                <a href={link} target="new">
                    <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-lg leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Search {event.title}</button></a>
                <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => deleteEvent()}>Delete This Event</button>
            </div>
        </div>
    )
}
/* <div className='w-full flex justify-center'>
            <p>{event.title}</p>
            <div className="text-gray-700 text-md">
                <p>Starts at {startTime}</p>
            </div>
        </div> */
        // <div className="flex justify-center">
        //     <div className="rounded-lg shadow-lg bg-white min-w-[23rem]">
        //         {/* <a href="#!">
        //             <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
        //         </a> */}
        // <div className="p-4">
        //     <h5 className="text-gray-900 text-xl font-semibold mb-2">{event.title}</h5>
        //     <div className='w-full flex justify-between'>
        //         <p className="text-gray-700 text-md">
        //             Category
        //         </p>
        //         <p className="text-gray-700">{event.category}</p>
        //     </div>
        //     <div className='w-full flex justify-between'>
        //         <p className="text-gray-700 text-md">
        //             Labels
        //         </p>
        //         <p className="text-gray-700">{event.labels.slice(0, 2).join(', ')}</p>
        //     </div>

        //                 <div className='w-full flex justify-between'>
        //                     <p className="text-gray-700 text-md">
        //                         Start Time
        //                     </p>
        //                     <p className="text-gray-700">{event.start}</p>
        //                 </div>
        //                 <div className='w-full flex justify-between'>
        //                     <p className="text-gray-700 text-md">
        //                         End Time
        //                     </p>


    //                 <div className='flex justify-between mx-4'>
    //                     {event.description ?
    //                         <button
    //                             className="px-4 py-2 mt-4 rounded-md text-gray-600 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out
    //                                             "data-bs-toggle="collapse" data-bs-target={`#descriptionCollapse${cardId}`} aria-expanded="false" aria-controls={`descriptionCollapse${cardId}`}>
    //                             Extra Info
    //                         </button>
    //                         :
    //                         <div></div>}
    //                     {JSON.stringify(user) === JSON.stringify({}) ?
    //                         <button type="button" className=" cursor-not-allowed opacity-50 mt-4 text-white inline-block px-6 py-2.5 bg-emerald-600 font-medium text-xs leading-tight uppercase rounded shadow-md">
    //                             Save Event</button>
    //                         :
    //                         <button type="button" className=" mt-4 inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-800 hover:shadow-lg focus:bg-emerald-800
    //                         focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
    //                             onClick={() => saveEvent()}>
    //                             Save Event</button>
    //                     }
    //                 </div>
    //                 <div className="collapse" id={`descriptionCollapse${cardId}`}>
    //                     <div className="block p-6 rounded-lg shadow-lg bg-white">
    //                         {event.description}
    //                     </div>
    //                 </div>
    //                 <div id={`hiddenError${cardId}`} className="hidden text-center">
    //                     <p className='text-red-600 text-center text-sm mt-2'>Event has been saved already for user {user.username}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
//  )
// }
