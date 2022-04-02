import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./homepage/Sidebar";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";

export const HomePage = ({user}) => {
  const [apiEvents, setApiEvents] = useState({});
 
  useEffect(()=>{
    // re-render page when the apiEvents object changes.
  }, [Object.keys(apiEvents).length])

  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <Sidebar apiEvents={apiEvents} setApiEvents={setApiEvents}/>
        <Map />
      </div>
      <Footer />
    </div>
  );
};
