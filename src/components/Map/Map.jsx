import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMapCoords } from '../../features/coordsSlice/coordsSlice';

const Map = ({ hotelArray, hoveredHotelIndex, coordinates, setCoordinates }) => {
  const [popupContent, setPopupContent] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const initialCoords = useSelector((state) => state.coords.coords);

  useEffect(() => {
    let hoveredHotelIndex = null
    if (hoveredHotelIndex !== null) {
      const hotel = hotelArray[hoveredHotelIndex];
      setPopupContent(makePopupContent(hotel));
      setPopupPosition([hotel?.latitude, hotel?.longitude]);
    } else {
      setPopupContent(null);
      setPopupPosition(null);
    }
  }, [hoveredHotelIndex, hotelArray]);

  const makePopupContent = (hotel) => (
    <div className='text-center'>
      <h3>{hotel?.hotel_name}</h3>
      <p>{hotel?.review_nr || 1000}</p>
      <p>{hotel?.review_score || 8.00}</p>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={initialCoords?.length > 0 ? coordinates : [51.5113251094925, -0.126435699999989]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <CoordsComponent setCoordinates={setCoordinates} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {popupContent && popupPosition && (
          <Popup position={popupPosition} onClose={() => { setPopupContent(null); setPopupPosition(null); }}>
            {popupContent}
          </Popup>
        )}

        {hotelArray?.map((hotel, index) => (
          <Marker key={index} position={[hotel?.latitude, hotel?.longitude]}>
            {hoveredHotelIndex === index && (
              <Popup closeButton={false} offset={[0, -8]}>
                {makePopupContent(hotel)}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

const CoordsComponent = ({setCoordinates}) => {
  const map = useMap();
  const dispatch = useDispatch();
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    const handleMoveEnd = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      setDebounceTimeout(
        setTimeout(() => {
          const { lat, lng } = map.getCenter();
          // dispatch(setMapCoords([lat, lng]));
          setCoordinates([lat,lng])
        }, 3000) // Consider reducing to 1000 ms for quicker updates
      );
    };

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [map, dispatch, debounceTimeout]);

  return null;
};
