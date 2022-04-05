import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./homepage/Sidebar";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";
import { useState, useEffect } from "react";
import { useJsApiLoader } from '@react-google-maps/api';

const placeLib = ['places'];
export const HomePage = ({ user, setUser }) => {
  const [apiEvents, setApiEvents] = useState([]);
  const [mapBase, setMapBase] = useState({});


  // load GoogleMap API key here so we don't call it twice in the autocomplete and google map components
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS,
    libraries: placeLib
  })


  useEffect(() => {
    // re-render page when the apiEvents object or when user logs in or out changes.
    console.log("useEffect in HomePage is fired, reloaded page due to change in apiEvents")
  }, [apiEvents.length, JSON.stringify(user)])

  if (!isLoaded) return <div>Waiting for Google API to load ...</div>;
  return (
    <div className="flex-col">
      <Header user={user} setUser={setUser} />
      <div className="flex relative">
        <Sidebar apiEvents={apiEvents} setApiEvents={setApiEvents} user={user} setMapBase={setMapBase} />
        <Map apiEvents={apiEvents} mapBase={mapBase} />
      </div>
      <Footer />
    </div>
  );
};
