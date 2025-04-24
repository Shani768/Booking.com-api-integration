import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewScores = () => {
  const [scores, setScores] = useState([]);
  const [selectedType, setSelectedType] = useState('');
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
        url: `https://booking-com.p.rapidapi.com/v1/hotels/review-scores?hotel_id=${id}&locale=en-gb`,
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
        }
      };

      try {
        const response = await axios.request(options);
        setScores(response?.data);
        prevIdRef.current = id;
        // console.log('hotel data', response.data);
      } catch (error) {
        setError('Error fetching hotel data');
        console.error('Error fetching hotel data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set a delay of 6 seconds before making the API call
    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetchHotelData();
    }, 6000); // 6000ms = 6 seconds

    // Cleanup timeout if the component unmounts or rerenders
    return () => clearTimeout(timeoutId);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getProgressBarWidth = (score) => `${(score / 10) * 100}%`;

  const filteredScores = scores?.score_breakdown?.find(score => score.customer_type === selectedType);

  return (
    <div className="mx-20 mt-10">
      <h3 className='text-center font-bold text-lg mx-20'>Review Scores</h3>

      <select
        onChange={handleTypeChange}
        className="my-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 text-lg bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
      >
        <option value="" className="text-gray-500">Select Customer Type</option>
        {scores?.score_breakdown?.map((score, index) => (
          <option key={index} value={score.customer_type}>
            {score.customer_type}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap -m-2 mb-20">
        {filteredScores && filteredScores.question.map((score, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 overflow-hidden">
            <div className="mb-2">
              <div className="flex justify-between overflow-hidden mb-1">
                <span>{score.localized_question}</span>
                <span>{score.score}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-sky-500 h-full text-xs text-center text-white flex justify-center items-center rounded-full"
                  style={{ width: getProgressBarWidth(score.score) }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewScores;
