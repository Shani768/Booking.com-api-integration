import HotelSearch from './HotelSearch'

const HotelBanner = () => {
  return (
    <div
      className="flex flex-col items-center py-28 m-auto md:mx-8 rounded-md md:py-16"
      style={{
        backgroundImage: `url('/home.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center text-white mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Find your next stay</h1>
        <p className="text-base md:text-lg">Search deals on hotels, homes, and much more...</p>
      </div>
          <HotelSearch />
      </div>
  )
}

export default HotelBanner