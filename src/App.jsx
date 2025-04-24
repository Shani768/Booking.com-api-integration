import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Hotel/Home';
import PropertiesListing from './components/Property/PropertyListing'
// import HotelInfo from './components/HotelInfo/HotelInfo'
import HotelDetail from './components/HotelDetail/HotelDetail';
import Footer from './components/Hotel/Footer';
import Flight from './pages/Flight';
import Taxi from './pages/Taxi';
import CruiseShip from './pages/CruiseShip';
import NotFound from './components/Hotel/NotFound';

export default function App() {
  return (
    <>
      <div className='h-full max-w-[1600px] mx-auto bg-gray-50 '>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight" element={<Flight />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/Cruise-ship" element={<CruiseShip />} />
          <Route path="/properties" element={<PropertiesListing />} />
          {/* <Route path="/hotelInfo/:id" element={<HotelInfo />} /> */}
          <Route path="/hotelDetail/:id" element={<HotelDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          <Footer />
      </div>
    </>
  )
}