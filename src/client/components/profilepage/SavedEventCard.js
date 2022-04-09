import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const SavedEventCard = ({ event, cardId, user, userEvents, setUserEvents, index }) => {
    // const options = { }
    // converts date string into a local date time format, removes the last 21 characters
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", timeZoneName: "short" })
            ;
    }
    const startTime = timeConverter(event.start_time);
    const link = `https://www.google.com/search?q=${event.title}+${event.address}`;
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
                setUserEvents(userEvents.filter((e) => e.eventid !== event.eventid));
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="flex justify-center mb-4">
            <div className="block px-6 py-4 rounded-lg shadow-lg w-1/2 bg-white">
                <h5 className="text-gray-600 text-xl leading-tight font-semibold">{index + 1}. {event.title}</h5>
                <p className="text-gray-600 text-base ">{startTime}</p>
                <p>{event.address}</p>
                <p className="text-gray-500">category: {event.category}</p>
                <p className="text-gray-500">tags: {event.labels}</p>
                <div class="flex space-x-2 justify-center">
                    <a href={link} target="new">
                        <SearchIcon className="mt-4 p-1.5 rounded-md shadow-sm text-gray-300 bg-green-400 hover:bg-green-300" style={{ color: "blue", fontSize: 40 }} /></a>
                    <DeleteRoundedIcon className="mt-4 p-1.5 rounded-md shadow-sm text-gray-300 bg-red-500 hover:bg-red-400" onClick={() => deleteEvent()} style={{ color: "blue", fontSize: 40 }} />
                </div>
            </div>
        </div>
    )
}
{/* <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Google it!</button></a> */ }
{/* <button type="button" className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => deleteEvent()}>Delete</button>
             */}
