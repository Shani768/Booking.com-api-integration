import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromApi } from '../../utils/fetchFromApi'; // Adjust the import path as needed

const Property = () => {
    const [hotelPhotos, setHotelPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // For carousel functionality
    const [isLoading, setIsLoading] = useState(true); // Optional: track loading state
    const { id } = useParams();

    // Use a ref to keep track of whether the data has been fetched
    
    const hasFetchedData = useRef(false);

    const fetchData = useCallback(async () => {
        if (hasFetchedData.current) {
            return; // Skip fetch if data has already been fetched
        }

        try {
            const apiurl = `v1/hotels/photos?hotel_id=${id}&locale=en-gb`;
            const photosData = await fetchFromApi(apiurl);
            setHotelPhotos(photosData || []);
            console.log('Fetched photos data:', photosData);

            hasFetchedData.current = true; // Mark data as fetched
        } catch (error) {
            console.error('Error fetching hotel photos:', error);
        } finally {
            setIsLoading(false); // Optionally update loading state
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    console.log('url', hotelPhotos)
    // Function to handle previous photo
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? hotelPhotos.length - 1 : prevIndex - 1));
    };

    // Function to handle next photo
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === hotelPhotos.length - 1 ? 0 : prevIndex + 1));
    };

    if (isLoading) {
        return <div>Loading...</div>; // Optionally show a loading indicator
    }

    return (
<div className="bg-gray-100 mx-10">
      <div className="flex max-w-7xl mt-8 mx-auto">
        {/* Main Image Section */}
        <div className="flex-grow flex items-center justify-center">
          <div className="relative ml-4 w-full">
            {hotelPhotos.length > 0 && (
              <img
                src={hotelPhotos[currentIndex].url_1440} // Main image
                alt="Main Image"
                className="object-cover rounded-lg shadow-lg w-full h-[280px]"
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
        <div className="w-1/4 space-y-4 ml-4">
          {hotelPhotos.slice(0, 1).map((photo, index) => (
            <div key={index}>
              <img
                src={hotelPhotos[2].url_1440}
                alt={`Image ${index + 1}`}
                className="object-cover rounded-lg shadow-lg w-full h-32"
              />
            </div>
          ))}
          {hotelPhotos.length > 4 && (
            <div className="flex gap-x-2">
                <img src={hotelPhotos[3].url_1440} alt="Image 2" className="object-cover rounded-lg shadow-lg w-full h-32"></img>
              <div className="relative">
                <img
                  src={hotelPhotos[4].url_1440}
                  alt={`Image 5`}
                  className="object-cover rounded-lg shadow-lg w-full h-32"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white font-semibold text-lg">
                    +{hotelPhotos.length - 4}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
     
  )
};

export default Property;



