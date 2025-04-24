import {useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    FaHome,FaBath,FaWifi, FaUsers, FaShower, FaChair,FaSmokingBan,FaUtensils,FaTv,FaThermometerHalf,FaKey, FaFireExtinguisher, FaFileInvoice
} from 'react-icons/fa';

 const iconMap = {
    Apartments: FaHome,
    'Private bathroom': FaBath,
    'Free WiFi': FaWifi,
    'Family rooms': FaUsers,
    Shower: FaShower,
    Terrace: FaChair,
    'Non-smoking rooms': FaSmokingBan,
    Kitchen: FaUtensils,
    'Flat-screen TV': FaTv,
    Heating: FaThermometerHalf,
    'Non-smoking throughout': FaSmokingBan,
    'Private check-in/check-out': FaKey,
    'Smoke alarms': FaFireExtinguisher,
    'Invoice provided': FaFileInvoice,
    // Add more mappings as needed
};

const HotelFacilities = () => {
    const [facilities, setFacilities] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const { id } = useParams();
    const prevIdRef = useRef();
  
    useEffect(() => {
      if (prevIdRef.current === id) {
        setLoading(false);
        return;
      }
  
      const fetchHotelData = async () => {
        const options = {
          method: 'GET',
          url: `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${id}&locale=en-gb`,
          headers: {
            'x-rapidapi-host': 'booking-com.p.rapidapi.com',
            'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
          }
        };
  
        try {
          const response = await axios.request(options);
          setFacilities(response?.data);
          prevIdRef.current = id;
        //   console.log('facilities data', response?.data);
        } catch (error) {
          setError('Error fetching hotel data');
          console.error('Error fetching hotel data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      setLoading(true);
      fetchHotelData();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
  return (
    
            <div className="flex flex-wrap gap-4 justify-center md:mx-24 items-center p-4">
                {facilities.map((facility, index) => {
                    const Icon = iconMap[facility.facility_name] || FaHome; // Default icon if not found
                    return (
                        <div
                            key={index}
                            className="flex items-center  space-x-2 bg-white border rounded-lg p-4 shadow hover:shadow-lg transition duration-150"
                        >
                            <Icon className="text-lg bg-black text-white" size={25} />
                            <span className="text-sm">{facility.facility_name}</span>
                        </div>
                    );
                })}
            </div>
  )
}

export default HotelFacilities