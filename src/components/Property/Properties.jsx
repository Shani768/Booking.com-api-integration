import { fetchFromApi } from '../../utils/fetchFromApi';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const Properties = ({ selectedFilters, getSorts }) => {
  const [loading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [error, setError] = useState(null)


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
      let hotelApiUrl = `v1/hotels/search?locale=en-gb&room_number=${queryParams.room_number}&checkin_date=${queryParams.checkin_date}&checkout_date=${queryParams.checkout_date}&filter_by_currency=USD&dest_id=${queryParams?.dest_id}&dest_type=${queryParams?.dest_type}&adults_number=${queryParams.adults_number}&order_by=${getSorts ? getSorts : queryParams?.order_by}&units=metric&page_number=${page}`;

      if (selectedFilters?.length > 0) {
        hotelApiUrl += `&categories_filter_ids=${selectedFilters.join(',')}`;
      }

      const hotelData = await fetchFromApi(hotelApiUrl);

      if (hotelData.result.length > 0) {
        setHotels((prevHotels) => (page === 0 ? hotelData.result : [...prevHotels, ...hotelData.result]));
        // console.log('Fetched hotelData', hotelData);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, selectedFilters, page, getSorts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading && hasMore) {
        // console.log('Reached bottom, loading more...');
        setPage((prevPage) => prevPage + 1);
      }
      // console.log('page scroll', page)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Reset page, hotels, and hasMore when queryParams, selectedFilters, or getSorts change
  useEffect(() => {
    setPage(0);
    setHotels([]);
    setHasMore(true);
  }, [queryParams, selectedFilters, getSorts]);

  useEffect(() => {
    if (!isOpen && (queryParams || selectedFilters || getSorts)) {
      fetchData();
    }
  }, [queryParams, selectedFilters, getSorts, fetchData, isOpen]);


   if(error) {
    return<div>{error}</div>
   }

  return (
    <div className="flex flex-col gap-6">
      <PropertyCard hotels={hotels} />
      {loading && <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
          </div>}
    </div>
  );
};

export default Properties;
