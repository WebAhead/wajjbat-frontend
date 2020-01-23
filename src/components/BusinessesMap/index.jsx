import React, { useState, useRef, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import pinIcon from '../../assets/icons/pin.svg'

import 'mapbox-gl/dist/mapbox-gl.css'

const styles = {
    width: '100%',
    height: '60vh',
};

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

function BusinessMap({ userPosition, businesses }) {
    const [map, setMap] = useState(null)
    const [mapOptions, setMapOptions] = useState({
        center:[userPosition.lng, userPosition.lat],
        zoom: 8,
    })
    const mapContainer = useRef(null)

    // useEffect(() => {

    // const initializeMap = (setMapState, mapContainerRef) => {
    //     const mapbox = new mapboxgl.Map({
    //         container: mapContainerRef.current,
    //         style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    //         ...mapOptions,
    //     });

    //     const nearby = businesses.filter(({ distance }) => distance)
    //         .map(({ lng, lat }) => [lng, lat])

    //     mapbox.on('load', () => {
    //         mapbox.resize();

    //         // new mapboxgl.Marker()
    //         //     .setLngLat([userPosition.lng, userPosition.lat])
    //         //     .addTo(mapbox);

    //         nearby.forEach((coords) => {
    //             new mapboxgl.Marker()
    //                 .setLngLat(coords)
    //                 .addTo(mapbox);
    //         })

    //         setMapState(mapbox);
    //     });
    // };

    // if (!map) initializeMap(setMap, mapContainer);

    // }, [map]);

    return (
        <div>
            <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                    height: '100vh',
                    width: '100vw',
                }}
                zoom={[10]}
                center={[userPosition.lng, userPosition.lat]}

            >
                {/* <Layer
                    type="symbol"
                    id="marker"
                    layout={{ 'icon-image': 'star-15' }}
                >
                    <Feature  coordinates={[userPosition.lng, userPosition.lat]} />
                </Layer> */}
                <Marker anchor="bottom" coordinates={[userPosition.lng, userPosition.lat]}>
                    <img
                        src={pinIcon}
                        alt=""
                        style={{ maxWidth: '30px', minWidth: '30px' }}
                    />
                    M
                </Marker>
            </Map>
        </div>
    );
}

export default BusinessMap;
