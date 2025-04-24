import {useState,useEffect,useRef} from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HotelStarRating } from './HotelStarRating'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HotelPhotos from './HotelPhotos';
import HotelFacilities from './HotelFacilities';
import HotelDesc from './HotelDesc';
import ReviewSection from './Reviews';
import HotelPolicies from './HotelPolicies';
import ReviewScores from './ReviewScore';


const HotelDetail = () => {
    const [hotelData, setHotelData] = useState(null);
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
          url: `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-gb`,
          headers: {
            'x-rapidapi-host': 'booking-com.p.rapidapi.com',
            'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
          }
        };
  
        try {
          const response = await axios.request(options);
          setHotelData(response?.data);
          prevIdRef.current = id;
         
          // console.log('hotel data', response.data);
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
    <div className=" max-w-[1500px] mx-auto ">
            <div className="flex flex-col mb-2 space-x-4 p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">

                    <div>
                        <h2 className="text-xl mt-6 font-semibold">{hotelData?.name}</h2>
                    </div>
                </div>

                {/* Location and Map Link */}
                <div className="flex items-center ml-10  space-x-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span className="text-sm">{hotelData?.address}, {hotelData?.city}, {hotelData?.country}</span>
                    <a href={hotelData?.url} className="text-blue-600 hover:underline text-sm">booking.com Url Link</a>
                    {/* Star Rating */}
                    <HotelStarRating rating={hotelData?.booking_home?.quality_class} />
                </div>
            </div>
            {/* hotel photos  */}
            <HotelPhotos />
            {/* Hotel Facilities  */}
            <h3 className='font-bold text-center text-lg mt-12 '>Hotel facilities</h3>
            <HotelFacilities />
            {/* hotel description and map  */}
            
           <HotelDesc hotelData={hotelData} />

                <ReviewSection />

                <HotelPolicies />

                <ReviewScores />

            </div>
  )
}

export default HotelDetail