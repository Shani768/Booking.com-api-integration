import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RandomImageGallery from './ImageGallery'

const HotelPhotos = () => {
    const [hotelPhotos, setHotelPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
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
          url: `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${id}&locale=en-gb`,
          headers: {
            'x-rapidapi-host': 'booking-com.p.rapidapi.com',
            'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
          }
        };
  
        try {
          const response = await axios.request(options);
          setHotelPhotos(response?.data);
          prevIdRef.current = id;
        //   console.log('Photos data', response?.data);
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

    // Function to handle previous photo
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? hotelPhotos.length - 1 : prevIndex - 1));
    };

    // Function to handle next photo
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === hotelPhotos.length - 1 ? 0 : prevIndex + 1));
    };

  
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

    };


    if (loading) {
      return <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
    </div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  return (
    <div className="flex max-w-7xl mt-2 mx-auto ">
            {/* Main Image Section */}
            <div className="flex-grow flex items-center justify-center">
                <div className="relative ml-4 w-full">
                    {hotelPhotos.length > 0 && (
                        <img
                            src={hotelPhotos[currentIndex].url_1440} // Main image
                            alt="Main Image"
                            className="object-cover rounded-lg shadow-lg w-full h-[320px]"
                        />
                    )}
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-lg"
                        onClick={handlePrev}
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-lg"
                        onClick={handleNext}
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Sidebar Images Section */}
            <div className="w-1/4 space-y-4 ml-4 mr-4">
                {hotelPhotos?.slice(0, 1).map((photo, index) => (
                    <div key={index}>
                        <img
                            src={hotelPhotos[2]?.url_1440}
                            alt={`Image ${index + 1}`}
                            className="object-cover rounded-lg shadow-lg w-full h-32"
                        />
                    </div>
                ))}
                {hotelPhotos?.length > 4 && (
                    <div className="flex flex-col mr-4 sm:flex-row gap-x-2">
                        <div className="relative w-full sm:w-1/2">
                            <img
                                src={hotelPhotos[3]?.url_1440}
                                alt="Image 2"
                                className="object-cover rounded-lg shadow-lg w-full h-32 sm:h-auto"
                            />
                        </div>
                        <div className="relative w-full sm:w-1/2">
                            <img
                                src={hotelPhotos[4]?.url_1440}
                                alt={`Image 5`}
                                className="object-cover rounded-lg shadow-lg w-full h-32 sm:h-auto"
                            />
                            <div onClick={() => handleOpenModal()} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <span className="text-white font-semibold text-lg">
                                    +{hotelPhotos.length - 4}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl h-[90vh] w-[90vw] overflow-auto relative">
      <h2 className="text-lg font-semibold mb-4">Photos</h2>
      <RandomImageGallery hotelPhotos={hotelPhotos} />
      <button
        onClick={handleCloseModal}
        className="text-lg absolute top-4 right-4"
      >
        X
      </button>
    </div>
  </div>
)}


        </div>

  )
}

export default HotelPhotos