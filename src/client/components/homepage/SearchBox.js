import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export const SearchBox = ({ apiEvents, setApiEvents }) => {
  const apiKey = process.env.PREDICTHQ_API_KEY;
  const onFind = async () => {
    // TODO use values in form for params

    let location = document.getElementById("locationForm").value;
    let geocodingUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json')
    let geocodingParams = {address: location, key:process.env.GOOGLE_MAPS }
    geocodingUrl.search = new URLSearchParams(geocodingParams).toString();
    let geocodedAddress = await fetch(geocodingUrl).then(res => res.json());

    console.log(geocodedAddress);
    let latitude = geocodedAddress.results[0].geometry.location.lat;
    let longitude = geocodedAddress.results[0].geometry.location.lng;

    let radius = document.getElementById("radiusForm").value;

    const eventParams = {
      category: "concerts",
      "active.gte": "2022-03-29",
      "active.lte": "2022-04-15",
      within: radius + "mi@" + latitude + "," + longitude,
    };

    let url = new URL("https://api.predicthq.com/v1/events");
    url.search = new URLSearchParams(eventParams).toString();

    console.log(" the predictHQ api key is: ", apiKey);
    const eventAPIParams = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      },
    };

    const events = await fetch(url, eventAPIParams)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("events is: ", events);
    // if (Object.keys(events).length > 0) setApiEvents(events);
  };

  return (
    <div
      id="SearchBox"
      className="flex flex-col border-2 border-gray-300 justify-center items-center w-full"
    >
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
      <div class="flex justify-center">
        <div>
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
              onChange={(e) => {}}
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

          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Expos"
              id="flexCheckExpos"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckExpos"
            >
              Expos
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Conferences"
              id="flexCheckConferences"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckConferences"
            >
              Conferences
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Community"
              id="flexCheckCommunity"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckCommunity"
            >
              Community
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Concerts"
              id="flexCheckConcerts"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckConcerts"
            >
              Concerts
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Festivals"
              id="flexCheckFestivals"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckFestivals"
            >
              Festivals
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="Performing Arts"
              id="flexCheckPerformingArts"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckPerformingArts"
            >
              Performing Arts
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="sports"
              id="flexCheckSports"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="flexCheckSports"
            >
              Sports
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          onFind();
        }}
        className="text-lg font-bold text-white py-1 px-1 ml-1 mb-2 cursor-pointer border rounded-md border-gray-200 bg-blue-400 hover:bg-blue-600 hover:text-white
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-blue-600
        transition
        duration-500 "
      >
        Search Events
      </button>
    </div>
  );
};
