import React, {Suspense} from 'react'
import HotelBanner from './HotelBanner'
// import HotelListings from './HomeShow';
import Detail from './Detail'

// Lazily load the MyComponent
const Trending = React.lazy(() => import('./Trending'));
const HotelListings = React.lazy(() => import('./HomeShow'));

const Home = () => {
  
  return (
    <div className='mt-4 mx-auto'>
        <HotelBanner />
        <div className="p-8 mx-8 mt-12 ">
      <h2 className="text-2xl font-bold mb-8 text-left ">Trending destinations</h2>
      {/* trending destination  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src="/london.jpg"
            alt="London"
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
            London 🇬🇧
          </div>
        </div>
        <div className="relative">
          <img
            src="/paris.jpg"
            alt="Paris"
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
            Paris 🇫🇷
          </div>
        </div>
      </div>
    </div>
      
       <Suspense fallback={<div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div> }>
        <Trending />
      </Suspense>
   <Suspense fallback={<div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div> }>
    <HotelListings />
   </Suspense>
     <Detail />
     

    </div>
    
  )
}

export default Home