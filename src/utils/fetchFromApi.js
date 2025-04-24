import axios from 'axios'

export const headers = {
'X-RapidAPI-Key': '24847262bbmsh2ee129512964a7bp143e64jsnc1df746ef874',
  'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
}

const BASE_URL = 'https://booking-com.p.rapidapi.com' 
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_BOOKING_API_KEY,
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url) =>{
   const {data} = await axios.get(`${BASE_URL}/${url}`, options)

   return data;
}







    