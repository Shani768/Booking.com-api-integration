import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/ModeSlice/ModelSlice';
import { useSearchParams } from 'react-router-dom';
import Map from '../Map/Map';
import { fetchFromApi } from '../../utils/fetchFromApi';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = () => {
  const dispatch = useDispatch();
  const [hotelCoords, setHotelCoords] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredHotelIndex, setHoveredHotelIndex] = useState(null);

  const suggestedResult = useSelector((state) => state.suggest.suggestResult);
  const isOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    if (isOpen) {
      setCoordinates([suggestedResult?.latitude, suggestedResult?.longitude]);
    }
  }, [isOpen, suggestedResult]);

  const queryParams = useMemo(() => {
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!coordinates[0] || !coordinates[1]) {
        setIsLoading(false);
        return;
      }

      const hotelApiUrl = `v1/hotels/search-by-coordinates?locale=en-gb&room_number=${queryParams?.room_number}&checkin_date=${queryParams?.checkin_date}&checkout_date=${queryParams?.checkout_date}&filter_by_currency=USD&longitude=${coordinates[1]}&latitude=${coordinates[0]}&adults_number=${queryParams?.adults_number}&order_by=popularity&units=metric&page_number=${page}`;
      const hotelData = await fetchFromApi(hotelApiUrl);
      //  console.log('coords ', hotelData)
      if (hotelData?.result.length > 0) {
        setHotelCoords((prevHotels) => (page === 0 ? hotelData.result : [...prevHotels, ...hotelData.result]));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, coordinates, page]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [fetchData, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white w-[90vw] h-[90vh] rounded-lg p-2">
        <button
          className="absolute top-[-6px] right-1 z-50  text-2xl font-bold rounded-full w-6 h-6 flex items-center justify-center bg-black text-white"
          onClick={() => dispatch(closeModal())}
        >
          <AiOutlineClose />
        </button>
        <div className="flex flex-col gap-4 md:flex-row h-full">
          <div className="flex-[0_0_30%] overflow-hidden border-b-slate-800 p-4 overflow-x-auto overflow-y-auto">
            {/* PropertyCard information */}
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
              </div>
            ) : (
              hotelCoords.map((hotel, index) => (
                <Link to={`/hotelDetail/${hotel?.hotel_id}`} key={index} className="w-full">
                  <div className={`border p-6 flex flex-col gap-4 shadow-lg rounded-lg`}>
                    <img
                      src={hotel?.max_photo_url}
                      alt="Hotel"
                      className={`w-full h-[15rem] rounded-lg object-cover`}
                    />
                    <div className="p-2 flex flex-col 2xl:gap-y-6 sm:gap-y-0 w-full">
                      <div className="flex flex-col mb-2 2xl:space-y-3">
                        <h2 className="text-lg font-bold text-gray-800">{hotel?.hotel_name}</h2>
                        <p className="text-gray-600 text-sm">{hotel?.address}</p>
                        <p className="text-gray-600 text-sm">{hotel?.city_name_en}, {hotel?.country_trans}</p>
                        <p className="text-gray-600 text-sm">{hotel?.district}</p>
                      </div>
                      <div className="flex flex-col 2xl:space-y-3 space-y-1">
                        <div className="flex justify-between text-gray-700 font-semibold">
                          <span>Rating:</span>
                          <span className="text-yellow-500">{hotel?.review_score || 8.00}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm">
                          <span>Check-in:</span>
                          <span className="font-medium">{hotel?.checkin?.from}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm">
                          <span>Check-out:</span>
                          <span className="font-medium">{hotel?.checkout?.until}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm">
                          <span>Cancellation:</span>
                          <span className="font-medium">{hotel?.is_free_cancellable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 font-bold">
                          <span>Price:</span>
                          <span className="font-bold">$ {hotel?.price_breakdown?.gross_price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}

          </div>
          <div className="flex-[0_0_67%]">
            <Map
              hotelArray={hotelCoords}
              onHover={setHoveredHotelIndex}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
