import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure you import the Leaflet CSS

// eslint-disable-next-line react/display-name
const MapComponent = React.memo(({ hotelData }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseOver = () => {
      setShowPopup(true);
    };
  
    const handleMouseOut = () => {
      setShowPopup(false);
    };

    // console.log('map hotel data', hotelData);

    const latitude = hotelData?.location?.latitude;
    const longitude = hotelData?.location?.longitude;

    return (
      <div className="relative w-80 h-48">
        {hotelData && latitude && longitude && (
          <MapContainer
            center={[latitude, longitude]}
            zoom={25}
            className="w-full h-full rounded-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[latitude, longitude]}
              eventHandlers={{
                mouseover: handleMouseOver,
                mouseout: handleMouseOut,
              }}
            >
              {showPopup && (
                <Popup className="w-56">
                  <div className="text-sm">
                    <h3 className="font-bold">{hotelData?.name}</h3>
                    <p>{hotelData?.address}</p>
                    <p>{hotelData?.review_score} stars</p>
                  </div>
                </Popup>
              )}
            </Marker>
          </MapContainer>
        )}
      </div>
    );
});

export default MapComponent;
