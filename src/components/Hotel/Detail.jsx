import { useState, useEffect} from 'react';
import axios from 'axios';
import { FaHotel,FaClock } from 'react-icons/fa';

const Destinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('regions');
  const [countryInfo, setCountryInfo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); 
  const [showMore, setShowMore] = useState(true); 
  
  useEffect(() => {
    const fetchHotelData = async () => {
      const options = {
        method: 'GET',
        url: `https://booking-com.p.rapidapi.com/v1/static/${selectedCategory}?country=pk&page=0`,
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
        }
      };

      try {
        const response = await axios.request(options);
        setCountryInfo(response?.data);
      } catch (error) {
        setError('Error fetching hotel data');
        console.error('Error fetching hotel data:', error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchHotelData();

  }, [selectedCategory]);

  const categories = ['regions', 'cities'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log('category', category);
  };

  if (loading) {
    return <div><div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
  </div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 20); 
    setShowMore(false);                                                  
  };
  
  const handleShowLess = () => {
    setVisibleCount(20); 
    setShowMore(true); 
  };
  
  // Filter cities with hotels
  const filteredCities = selectedCategory === 'cities' && countryInfo?.result?.filter(destination => destination.nr_hotels > 0);
  const filteredRegions = selectedCategory === 'regions' && countryInfo?.result; // Assuming regions have no additional filtering
  
  return (
    <div className="container mx-auto my-10">
    <h2 className="text-2xl font-bold mb-4 mx-20">Destinations we love</h2>
    <div className="flex space-x-4 mb-6 mx-20">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${selectedCategory === category
              ? 'bg-blue-100 text-sky-700 border border-blue-700'
              : 'bg-transparent text-gray-700 hover:bg-gray-200'
            }`}
        >
          {category}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-20">
      {selectedCategory === 'regions' && filteredRegions?.slice(0, visibleCount).map((destination, i) => (
        <div key={i} className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-md">{destination.name}</h3>
          <p className="text-sm text-gray-500">{destination.region_type}, {destination?.country}</p>
        </div>
      ))}

      {selectedCategory === 'cities' && filteredCities?.slice(0, visibleCount).map(destination => (
        <div key={destination?.city_id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-md">
            {destination.name} <span className="text-sm text-gray-500">, {destination?.country}</span>
          </h3>
          <div className="flex gap-2 mt-1 items-center justify-between">
            <div className="flex items-center gap-x-2">
              <FaHotel className="text-sm text-gray-500" />
              <p className="text-sm text-gray-500">{destination?.nr_hotels}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FaClock className="text-sm text-gray-500" />
              <p className="text-sm text-gray-500">{destination?.timezone_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Show More / Show Less button for both regions and cities */}
    {(selectedCategory === 'regions' || selectedCategory === 'cities') && (
      filteredCities?.length > 20 || filteredRegions?.length > 20) && (
        <div className="flex justify-center mt-6">
          {showMore ? (
            <button
              onClick={handleShowMore}
              className="px-4 py-2 text-lg font-medium bg-blue-400 text-white rounded-lg"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="px-4 py-2 text-lg font-medium bg-blue-400 text-white rounded-lg"
            >
              Show Less
            </button>
          )}
        </div>
      )}
  </div>
  );
};

export default Destinations;
