import { Link } from 'react-router-dom';

const PropertyCard = ({hotels,loading}) => {
  
  const review_sc = 8.00;
return (
  <>
    {hotels.length === 0 && !loading ? (
      <div>No hotels found</div>
    ) : (
      hotels.map((hotel, index) => (
        <Link to={`/hotelDetail/${hotel?.hotel_id}`} key={index} className="w-full">
        <div
          className={`border p-6 flex flex-col sm:flex-row gap-4 shadow-lg rounded-lg`}
        >
          <img
            src={hotel?.max_photo_url}
            alt="Hotel"
            className={`w-full 2xl:h-[25rem] h-[15rem] rounded-lg object-cover`}
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
                <span className="text-yellow-500">{hotel?.review_score || review_sc}</span>
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
    {loading && <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
          </div>}
  </>
)
}

export default PropertyCard
