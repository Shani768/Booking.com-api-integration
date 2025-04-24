import { fetchFromApi } from "../../utils/fetchFromApi";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';

const Filters = ({ filtersName, setFiltersName,selectedFilters, setSelectedFilters }) => {
  const [filters, setFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setIsLoading] = useState(true);

  const queryParams = useMemo(() => {
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setIsLoading(true); // Set loading to true before starting the fetch
    try {
      let filterApiUrl = `v1/hotels/search-filters?adults_number=${queryParams.adults_number}&filter_by_currency=${queryParams.filter_by_currency}&checkin_date=${queryParams.checkin_date}&dest_id=${queryParams?.dest_id}&dest_type=${queryParams?.dest_type}&checkout_date=${queryParams.checkout_date}&units=${queryParams.units}&room_number=${queryParams.room_number}&order_by=${queryParams.order_by}&locale=${queryParams.locale}`;

      if (selectedFilters.length > 0) {
        filterApiUrl += `&categories_filter_ids=${selectedFilters.join(',')}`;
      }

      const filterData = await fetchFromApi(filterApiUrl);
      setFilters(filterData?.filter);
      // console.log('filters', filterData)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); 
    }
  }, [queryParams, selectedFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckboxChange = (filterId, filterName) => {
    let updatedFilters = [];
    let updatedFilterNames = [];
    if (selectedFilters.includes(filterId)) {
      updatedFilters = selectedFilters.filter(id => id !== filterId);
      updatedFilterNames = filtersName.filter(name => name !== filterName);
    } else {
      updatedFilters = [...selectedFilters, filterId];
      updatedFilterNames = [...filtersName, filterName];
    }

    setSelectedFilters(updatedFilters);
    setFiltersName(updatedFilterNames);

    // Update the query parameters
    setSearchParams({ ...queryParams, categories_filter_ids: updatedFilters.join(',') });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div> 
      ) : (
        filters?.map((filter) => (
          <div className="mb-6" key={filter?.id}>
            <h2 className=" mb-2 font-bold">{filter?.title}</h2>
            <ul>
              {filter?.categories?.map((category) => (
                <li key={category?.id} className='py-2'>
                  <input type="checkbox" value={category?.id} 
                         checked={selectedFilters?.includes(category?.id)}
                         onChange={() => handleCheckboxChange(category?.id, category?.name)}
                  />
                  <label className="ml-2 xxl:text-5xl ">{category?.name}</label>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </>
  );
}

export default Filters;
