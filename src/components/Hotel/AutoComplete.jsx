import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/Debounce';
import { useDispatch } from "react-redux"
import { setSuggestedResult } from '../../features/suggestSlice/suggestSlice';
import axios from 'axios';
import { FaBed, FaMapMarkerAlt, FaPlane, FaLandmark, FaBuilding } from 'react-icons/fa';

const AutoComplete = () => {

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [result, setResult] = useState('');
  const [shouldFetch, setShouldFetch] = useState(true);
  const debouncedSearchTerm = useDebounce(inputValue, 1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch || debouncedSearchTerm === '') {
      return;
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${debouncedSearchTerm}&locale=en-gb`,
          {
            headers: {
              'x-rapidapi-host': 'booking-com.p.rapidapi.com',
              'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY,
            },
          }
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log(error);
        setError('Failed to load suggestions. Try again.');
      } finally {
        setLoading(false);
      }
    };
    setLoading(true)
    fetchData();
  }, [debouncedSearchTerm, shouldFetch]);

  const handleSuggestionClick = (clickedLabel) => {
    const clickedResult = searchResult.find((result) => result.label === clickedLabel);
    setInputValue(clickedLabel);
    setShouldFetch(false);
    setResult(clickedResult);
    dispatch(setSuggestedResult(clickedResult));

    setSearchResult([]);
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setShouldFetch(true);
  };

  return (

    <div className="relative">
      <input
        type="text"
        placeholder="Enter Location"
        className="w-full border text-center border-gray-300 p-3 rounded-lg"
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto z-50">
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm px-4 py-3">{error}</div>
          ) : (
            searchResult.map((result) => (
              <div
                key={result.dest_id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(result.label)}
              >
                {result.dest_type === 'city' && <FaMapMarkerAlt className="text-gray-500 mr-2" />}
                {result.dest_type === 'airport' && <FaPlane className="text-gray-500 mr-2" size={20} />}
                {result.dest_type === 'landmark' && <FaLandmark className="text-gray-500 mr-2" />}
                {result.dest_type === 'district' && <FaBuilding className="text-gray-500 mr-2" />}
                <div className='text-left'>
                  <span className="font-semibold text-sm">{result.name}</span>
                  <span className="block text-gray-500 text-xs">{result.label}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <div className="absolute left-4 top-4 text-black">
        <FaBed className="text-gray-500 mr-2" />
      </div>
    </div>
  )
}

export default AutoComplete