import React, { Component, useMemo, useCallback, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '85vh'
};

export const Map = () => {
    const [base, setBase] = useState(0);

    const center = useMemo(() => ({ lat: 37.768, lng: -122.42 }), []);
    const options = useMemo(() => ({
        mapId: "4db6fc355c1b4a66",
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);

    const mapRef = useRef();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS
    })

    const [map, setMap] = React.useState(null)

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            defaultCenter={center}
            center={center}
            zoom={14}
            options={options}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <div>Loading ....</div>
}
