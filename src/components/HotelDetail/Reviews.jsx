import { useState, useEffect, useRef, useCallback } from 'react';
import { HotelStarRating } from './HotelStarRating';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReviewFilters from './ReviewFilters';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);

  const { id } = useParams();
  // const prevIdRef = useRef();

  const fetchHotelData = useCallback(async () => {
    const sortValue = filters?.sort ? filters.sort.toUpperCase() : 'SORT_MOST_RELEVANT';
    console.log('sort value', sortValue)
    const options = {
      method: 'GET',
      url: `https://booking-com.p.rapidapi.com/v1/hotels/reviews?customer_type=${filters?.filter_customer_type || 'solo_traveller%2Creview_category_group_of_friends'}&locale=en-gb&sort_type=${sortValue}&language_filter=${filters?.language || 'en-gb'}&hotel_id=${id}&page_number=${page}`,
      headers: {
        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
      }
    };

    try {
      const response = await axios.request(options);
      setReviews(response?.data);
      setLoading(false);
      // console.log('reviews', response?.data)
    } catch (error) {
      setError('Error fetching hotel data');
      console.error('Error fetching hotel data:', error);
      setLoading(false);
    }
  }, [id, filters, page]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleFilterChange = useCallback((newFilter) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilter };
      console.log('Updated Filters:', updatedFilters);
      return updatedFilters;
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto p-6 space-y-6">
      <h3 className="text-lg font-bold">
        Guests who stayed here loved: {reviews?.count}
      </h3>
      <ReviewFilters onFilterChange={handleFilterChange} />

      <div className="mx-auto p-6 space-y-6">
        <div className="max-w-6xl 2xl:max-w-[80rem] mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg">
          {reviews?.result && reviews.result.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleScroll('left')}
                  className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                  aria-label="Previous Review"
                >
                  <FaChevronLeft className="w-6 h-6 text-gray-500" />
                </button>
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-hidden space-x-4 scrollbar-hidden"
                >
                  {reviews.result.map((review, index) => (
                    <div
                      key={index}
                      className="w-[350px] 2xl:w-[300px] h-80 p-4 rounded-md shadow-lg flex-shrink-0"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        {review?.author?.avatar ? (
                          <img
                            className="w-12 h-12 rounded-full"
                            src={review.author.avatar}
                            alt="Reviewer"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                              {review?.author?.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h2 className="text-lg font-semibold">{review?.author?.name}</h2>
                          <p className="text-sm text-gray-500">
                            {review?.author?.type_string} from{' '}
                            <span className="uppercase">
                              {review?.author?.countrycode}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          {review?.title ? (
                            review.title.split(' ').length > 5
                              ? review.title.split(' ').slice(0, 5).join(' ') + '...'
                              : review.title
                          ) : null}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <HotelStarRating rating={review?.average_score} />
                          <span className="text-sm text-gray-500">
                            {review?.average_score !== undefined
                              ? review.average_score.toFixed(1)
                              : ''}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {review.pros && review.pros.split(' ').length > 10 ? (
                            <>
                              {review.pros.split(' ').slice(0, 10).join(' ')}...
                            </>
                          ) : (
                            review.pros
                          )}
                          <button
                            onClick={() => handleOpenModal(review)}
                            className="text-blue-500 ml-1"
                          >
                            Read More
                          </button>
                        </p>
                        <p className="text-gray-600 font-semibold">
                          Stayed in Suite for {review?.stayed_room_info?.num_nights} nights
                        </p>
                        <p className="text-gray-500 text-sm">
                          {formatDate(review?.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <button
                      onClick={() => setPage(prev => prev + 1)}
                      className="bg-white text-blue-600 font-semibold border border-blue-500 shadow-md px-6 py-2 rounded-2xl hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                      Show more
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleScroll('right')}
                  className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                  aria-label="Next Review"
                >
                  <FaChevronRight className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">Review not found</div>
          )}

          {isModalOpen && selectedReview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[90vh] overflow-auto">
                <h2 className="text-lg font-semibold mb-4">Full Review</h2>

                <div className='flex gap-x-4 items-center mb-4'>
                  {selectedReview?.author?.avatar ? (
                    <img
                      className="w-12 h-12 rounded-full"
                      src={selectedReview.author.avatar}
                      alt="Reviewer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-700">
                        {selectedReview?.author?.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{selectedReview?.author?.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedReview?.author?.type_string} from{' '}
                      <span className="uppercase">
                        {selectedReview?.author?.countrycode}
                      </span>
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">
                  {selectedReview?.title}
                </h3>

                <div className="flex items-center space-x-1 mb-4">
                  <HotelStarRating rating={selectedReview?.average_score} />
                  <span className="text-sm text-gray-500">
                    {selectedReview?.average_score !== undefined
                      ? selectedReview.average_score.toFixed(1)
                      : ''}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{selectedReview.pros}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative">
                    <img
                      src={selectedReview?.stayed_room_info?.photo?.url_640x200}
                      alt="image1"
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <img
                      src={selectedReview?.stayed_room_info?.photo?.url_max300}
                      alt="image2"
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="relative">
                    <img
                      src={selectedReview?.stayed_room_info?.photo?.url_original}
                      alt="image3"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <img
                      src={selectedReview?.stayed_room_info?.photo?.url_square60}
                      alt="image4"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>

                <p className="text-gray-600 font-semibold mb-2">
                  Stayed in Suite for {selectedReview?.stayed_room_info?.num_nights} nights
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {formatDate(selectedReview?.date)}
                </p>
                <button onClick={handleCloseModal} className="text-blue-500">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
