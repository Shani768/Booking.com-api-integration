// src/components/HotelListings.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import axios from 'axios';
const HotelListings = () => {
  const [homeHotel, setHomeHotel] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchHotelData = async () => {
      const options = {
        method: 'GET',
        url: `https://booking-com.p.rapidapi.com/v1/static/hotels?page=0&country=pk`,
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
        }
      };

      try {
        const response = await axios.request(options);
      
        const limitedHotels = response.data?.result?.slice(0, 20); // Adjust this path based on the structure
        setHomeHotel(limitedHotels);
        // setHomeHotel(response?.data);
      
      } catch (error) {
        setError('Error fetching hotel data', error);
        
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchHotelData();
  }, [id]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };


  const RandomImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg','/image6.jpg', '/image7.jpg', '/image8.jpg', '/image9.jpg', '/image10.jpg']
  const getRandomImage = () => {
    return RandomImages[Math.floor(Math.random() * RandomImages.length)];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl pl-[50px] font-bold mb-4">Looking for the perfect stay?</h2>
      <p className="mb-6 pl-[50px]">Travellers with similar searches booked these properties</p>
      <div className="relative mx-20 overflow-hidden">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md"
        >
          <FaChevronRight />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-hidden space-x-4 pb-6"
          style={{ scrollBehavior: 'smooth' }}
        >

          {homeHotel?.map((hotel, index) => (
            <div
            key={index}
            className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/hotelDetail/${hotel?.hotel_id}`}>
              <img src={getRandomImage()} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">
                  {hotel.name.split(' ').slice(0, 3).join(' ')}
                </h3>
                <p className="text-sm text-gray-500">{hotel?.address}</p>
                <p className="text-sm text-gray-500">
                  {hotel.city}, {hotel?.country}
                </p>
                <p className="text-sm text-gray-500">{hotel?.spoken_languages}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className='flex justify-center items-center'>
                    <FaBed className="text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">{hotel?.number_of_rooms}</p>
                  </div>
                  <div className='flex gap-x-1 items-center'>
                    <div className='flex items-center'>
                      <FaRegCheckCircle className='text-gray-500' />
                      <p className="text-sm text-gray-500 ml-1">{hotel?.checkin_checkout_times?.checkin_from}</p>
                    </div>
                    <div className='flex items-center'>
                      {/* <FaRegCircle className='text-gray-500' /> */}
                      <p className="text-sm text-gray-500 ml-1">{hotel?.checkin_checkout_times?.checkout_to}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelListings;
