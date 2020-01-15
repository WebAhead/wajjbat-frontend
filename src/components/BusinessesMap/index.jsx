import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const styles = {
    width: '100%',
    height: 'calc(100vh - 80px)',
};

function BusinessMap({ userPosition, businesses }) {
    const [map, setMap] = useState(null)
    const [mapOptions, setMapOptions] = useState({
        center:[userPosition.lng, userPosition.lat],
        zoom:13,
    })
    const mapContainer = useRef(null)

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const initializeMap = (setMapState, mapContainerRef) => {
            // add markers
            const mapbox = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                ...mapOptions,
            });

            mapbox.on('load', () => {
                setMapState(mapbox);
                mapbox.resize();
            });
        };

        if (!map) initializeMap(setMap, mapContainer);

    }, [map]);

    return (
        <div>
            {/* eslint-disable-next-line no-return-assign */}
            <div ref={(el) => (mapContainer.current = el)} style={styles} />
        </div>
    );
}

export default BusinessMap;
