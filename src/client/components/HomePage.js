import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./homepage/Sidebar";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";
import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";

const placeLib = ['places'];
export const HomePage = ({ user, setUser }) => {
  const [apiEvents, setApiEvents] = useState([]);
  const [mapBase, setMapBase] = useState({});
  const [circleRadius, setCircleRadius] = useState(0);

  const location = useLocation();

  const mapRef = useRef();

  // load GoogleMap API key here so we don't call it twice in the autocomplete and google map components
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS,
    libraries: placeLib
  })


  useEffect(() => {
    // re-render page when the apiEvents object or when user logs in or out changes.
  }, [apiEvents.length, JSON.stringify(user), location])

  if (!isLoaded) return <div>Waiting for Google API to load ...</div>;
  return (
    <div className="flex-col">
      <Header user={user} setUser={setUser} />
      <div className="flex relative">
        <Sidebar apiEvents={apiEvents} setApiEvents={setApiEvents} user={user} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
        <Map apiEvents={apiEvents} mapBase={mapBase} mapRef={mapRef} circleRadius={circleRadius} />
      </div>
      <Footer />
    </div>
  );
};
