import React from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api';

export default ({ lat, lng, isOpen, setIsOpen }) => (
    <Marker
        position={{ lat, lng }}
        onClick={() => setIsOpen(!isOpen)}
    >
        {isOpen && (
            <InfoWindow
                onCloseClick={() => setIsOpen(false)}
            >
                <span>Something</span>
            </InfoWindow>
        )}
    </Marker>
)
