import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/ModeSlice/ModelSlice';
import Filters from './Filters';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Toggle from './Toggle';
import Properties from './Properties';
import Modal from '../Models/MapModel';


const PropertiesListing = () => {
  const [filtersName, setFiltersName] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [getSorts, setGetSorts] = useState(null)
  useEffect(() => {
     
  }, [getSorts])
  
  return (
    <>
      <div className='flex md:flex-row  gap-y-4  flex-col  mt-2 mx-10 gap-x-10 justify-between items-center'>
        <div className="relative w-[18rem] h-40 rounded-lg overflow-hidden shadow-lg">
          <img src="/map_image.jpg" alt="Map" className="object-cover w-full h-full "
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaMapMarkerAlt className="text-sky-400 text-3xl" />
          </div>
          <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-300 text-white px-2 py-2 rounded-full " onClick={() => dispatch(openModal())}>
             map
          </button>
        </div>

        <div>
          <Toggle setGetSorts={setGetSorts} />
        </div>

        <div className='w-full md:w-[50%]'>
          {/* <h3 className='font-bold text-lg text-center'>London: Properties count with filter: {hotels?.total_count_with_filters}</h3> */}
          <div className='md:flex flex-wrap hidden items-center justify-center w-full'>
            {filtersName?.map((name,i)=> (
              <p key={i} className='bg-gray-200 rounded-full px-2 py-1 mt-4 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                 #{name}
              </p>
            ))}
          </div>
        </div>
      </div>

    {isOpen &&
        <Modal />
    }

      <div className="flex flex-col md:flex-row mx-6">
        {/* Sidebar Filters */}
        <aside className=" lg:w-1/4 overflow-auto h-64 md:h-[100vh] p-10 mx-4 rounded-lg border-[1px] shadow-lg bg-white border-r mt-3 border-gray-200">
          <Filters filtersName={filtersName} setFiltersName={setFiltersName} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}  />
        </aside>
        <main className="w-full lg:w-3/4 p-4 ">
          <Properties selectedFilters={selectedFilters} getSorts={getSorts} />
        </main>
      </div>
    </>
  );
};

export default PropertiesListing;
