import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


export const Map = () => {
    const coordinates = { lat: 37.382483, lng: -122.209946 };

    return ( 
        // 
        <div className="border-4 border-blue-400 h-auto w-full">
            <div className="bg-gray-200" style={{ height: '80vh', width: '100%'}}>
            {/* <GoogleMapReact
,                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={() => { }}
                onChildClick={() => { }}
            >
                {/* <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                /> 
            </GoogleMapReact> */}
            </div>
            <div className='text-3xl text-blue-500 font-bold'>map</div>
        </div>
    );
}