import React from "react";

export const SearchBox = ({ apiEvents, setApiEvents }) => {
  const onFind = async () => {
    // TODO use values in form for params
    params = {
      category: "placeholder",
      startDate: "2022-03-29",
      endDate: " 2022-04-15",
      within: "20mi",
      lat: "37.23131",
      long: "-122.3213131",
    };

    let url = new URL("https://api.predicthq.com/v1/events");
    url.search = new URLSearchParams(params).toString();

    const events = await fetch(url)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    if (Object.keys(events).length > 0) setApiEvents(events);
  };

  return (
    <div
      id="SearchBox"
      className="flex flex-col border-2 border-gray-300 justify-center items-center w-full"
    >
      <div className="flex-row mb-1">
        <div className="text-md text-gray-500 mt-1">Start date</div>
        <input
          type="date"
          className="
form-control
w-48
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="startDateForm"
          placeholder="04-01-2022"
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <div className="mb-1">
        <div className="text-md text-gray-500 mt-1">End date</div>

        <input
          type="date"
          className="
form-control
w-48
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="endDateForm"
          placeholder="04-30-2022"
          onChange={(e) => {}}
        />
      </div>
      <div className="mb-1">
        <div className="text-md text-gray-500 mt-1">Radius (miles)</div>

        <input
          type="text"
          className="
form-control
w-24
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="radiusForm"
          placeholder="10"
          onChange={(e) => {}}
        />
      </div>
      <div className="mb-1">
        <div className="text-md text-gray-500 mt-1">Location</div>

        <input
          type="text"
          className="
form-control
w-48
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="locationForm"
          placeholder="San Francisco, CA"
          onChange={(e) => {}}
        />
      </div>
      <button
        onClick={() => {}}
        className="text-lg font-bold text-white py-3 px-2 ml-6 mb-5 cursor-pointer border rounded-md border-gray-200 bg-blue-400 hover:bg-blue-600 hover:text-white
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-blue-600
        transition
        duration-500 "
      >
        Search Events
      </button>
    </div>
  );
};
