export const mapHotelData = (data, type) => {
    if (type === 'simple') {
      // Mapping for simple hotels data
      return data.map(hotel => ({
        id: hotel.id,
        name: hotel.hotel_name,
        address: hotel.address,
        city: hotel.city_name_en,
        country: hotel.country_trans,
        district: hotel.district,
        rating: hotel.review_score,
        checkin: hotel.checkin?.from,
        checkout: hotel.checkout?.until,
        cancellable: hotel.is_free_cancellable,
        price: hotel.price_breakdown?.gross_price,
        image: hotel.max_photo_url
      }));
    } else if (type === 'coords') {
      // Mapping for hotelCoords data (assuming similar fields exist)
      return data.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        country: hotel.country,
        district: hotel.district,
        rating: hotel.rating,
        checkin: hotel.checkinTime,
        checkout: hotel.checkoutTime,
        cancellable: hotel.freeCancellation,
        price: hotel.price,
        image: hotel.imageUrl
      }));
    }
    return [];
  };
  