import React, { Component, useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Circle, GoogleMap, Marker, MarkerClusterer, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

// todo
// create state to center map - Done - mapBase
// pan map to location when user searches -Done - used useEffect in Map and panTo
// the state has to be accessible to both searchbox and map so homepage is likely a good place - Done
// learn how to create colored marker - DONE
// need to add number to apiEvents, - Done
// render number on eventCard, - Done
// show number on bubble, -Done
// learn how to create info window that is toggled on click of marker - done
// pass info from each event into info window and marker - done

const containerStyle = {
    width: '100%',
    height: '85vh'
};

export const Map = ({ apiEvents, mapBase, mapRef, circleRadius }) => {

    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        mapRef.current?.panTo(mapBase);

    }, [JSON.stringify(mapBase)]);

    const center = useMemo(() => ({ lat: 37.768, lng: -122.42 }), []);
    const options = useMemo(() => ({
        mapId: "4db6fc355c1b4a66",
        disableDefaultUI: false,
        clickableIcons: false,
    }), []);

    // const mapRef = useRef();

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.GOOGLE_MAPS
    // })
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US').slice(0, 21);
    }

    const [map, setMap] = React.useState(null)

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            defaultCenter={center}
            center={center}
            zoom={12}
            options={options}
            onLoad={onLoad}
        // onUnmount={onUnmount}
        >
            <>
                {(JSON.stringify(mapBase) !== JSON.stringify({}) &&
                    <Circle
                        center={{ lat: parseFloat(mapBase.lat), lng: parseFloat(mapBase.lng) }}
                        radius={circleRadius * 1609}
                        options={{
                            strokeOpacity: 0.5,
                            strokeWeight: 2,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            zIndex: 1,
                            fillOpacity: 0.05,
                            strokeColor: "#FBC02D",
                            fillColor: "#FBC02D"
                        }}
                    />
                )}
                {JSON.stringify(mapBase) !== JSON.stringify({}) && (
                    <Marker
                        position={{ lat: parseFloat(mapBase.lat), lng: parseFloat(mapBase.lng) }}
                        title="Location Center"
                        icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                    >
                    </Marker>
                )}

                {JSON.stringify(apiEvents) !== JSON.stringify({}) &&
                    <MarkerClusterer>
                        {(clusterer) =>
                            apiEvents.map((event, index) => (
                                event.location && (
                                    <Marker
                                        position={{ lat: parseFloat(event.location[1]), lng: parseFloat(event.location[0]) }}
                                        key={index}
                                        clusterer={clusterer}
                                        label={{
                                            text: index + 1 + "",
                                            color: "#ffffff",
                                            fontSize: "14px",
                                        }}
                                        onClick={() => {
                                            setSelectedEvent(event);
                                        }}
                                    >
                                        {selectedEvent && selectedEvent.id === event.id ? (
                                            <InfoWindow
                                                onCloseClick={() => {
                                                    setSelectedEvent(null);
                                                }}
                                                position={{
                                                    lat: parseFloat(event.location[1]),
                                                    lng: parseFloat(event.location[0])
                                                }}
                                            >
                                                <div className="text-center p-2 bg-gray-50 border-2 border-emerald-400 first-letter: shadow-md flex-row font-gray-500">
                                                    <h3 className='font-semibold text-base'>{event.title}</h3>
                                                    <h5 className='text-sm'>Category: {event.category}</h5>
                                                    <h5 className='text-sm'>{timeConverter(event.start)}</h5>
                                                    {event.phq_attendance > 0 && <p className='text-sm'>Attendance : {event.phq_attendance}</p>}
                                                    <a href={`https://www.google.com/search?q=${event.title}+${timeConverter(event.start)}`} target='new' className='text-sm text-blue-400 underline cursor-pointer hover:text-blue-600'>Search on Google</a>
                                                </div>
                                            </InfoWindow>
                                        ) : <></>}
                                    </Marker>)
                            ))
                        }
                    </MarkerClusterer>
                }
            </>
        </GoogleMap>
    )
    // : <div>loading...</div>
}
