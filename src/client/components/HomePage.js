import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./homepage/Sidebar";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";
import { useState, useEffect } from "react";


export const HomePage = ({ user, setUser }) => {
  const [apiEvents, setApiEvents] = useState([]);

  useEffect(() => {
    // re-render page when the apiEvents object changes.
    console.log("useEffect in HomePage is fired, reloaded page due to change in apiEvents")
  }, [apiEvents.length, JSON.stringify(user)])

  return (
    <div className="flex-col">
      <Header user={user} setUser={setUser} />
      <div className="flex relative">
        <Sidebar apiEvents={apiEvents} setApiEvents={setApiEvents} user={user} />
        <Map />
      </div>
      <Footer />
    </div>
  );
};
