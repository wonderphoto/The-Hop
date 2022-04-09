import React, { Component, useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Circle, GoogleMap, Marker, MarkerClusterer, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

// todo
// create state to center map - Done - mapBase
// pan map to location when user searches -Done - used useEffect in Map and panTo
// the state has to be accessible to both searchbox and map so homepage is likely a good place - Done
// learn how to create colored marker - DONE
// need to add number to apiEvents,
// render number on eventCard,
// show number on bubble,
// learn how to create info window that is toggled on click of marker
// pass info from each event into info window and marker

const containerStyle = {
    width: '100%',
    height: '85vh'
};

export const Map = ({ apiEvents, mapBase, mapRef, circleRadius }) => {
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
            className="map"
        // onUnmount={onUnmount}
        >
            <>
                {(mapBase &&
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
                {mapBase && (
                    <Marker
                        position={{ lat: parseFloat(mapBase.lat), lng: parseFloat(mapBase.lng) }}
                        title="Location Center"
                    >
                    </Marker>
                )}

                {apiEvents &&
                    <MarkerClusterer>
                        {(clusterer) =>
                            apiEvents.map((event, index) => (
                                event.location && (
                                    <Marker
                                        position={{ lat: parseFloat(event.location[1]), lng: parseFloat(event.location[0]) }}
                                        key={index}
                                        fillColor={"yellow"}
                                        fillOpacity={0.5}
                                        clusterer={clusterer}
                                        label={index + 1 + ""}
                                        icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'}
                                    >

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
