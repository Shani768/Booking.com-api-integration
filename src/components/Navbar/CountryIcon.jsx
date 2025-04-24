import {useState,useEffect} from 'react'
import Flags from 'react-world-flags';
import axios from 'axios'

const CountryIcon = () => {
    const [country, setCountry] = useState('');
    const [error, setError] = useState(null);

     useEffect(() => {
    const getIPLocationDetails = async () => {
      const apiKey = import.meta.env.VITE_IPINFO_API_KEY;
      const url = `https://ipinfo.io/json?token=${apiKey}`;

      try {
        const response = await axios.get(url);
        setCountry(response.data.country);
      } catch (err) {
        console.error('Error fetching IP location details:', err);
        setError('Failed to fetch location.');
      }
    };

    getIPLocationDetails();
  }, []);

  return (
    <div className='hidden md:flex'>
      {error ? (
        <div className="text-red-500 font-medium px-4 py-2">
          {error}
        </div>
      ) : country ? (
        <div className='flex gap-4 items-center justify-center pr-6'>
          <h1>{country}</h1>
          <Flags
            code={country}
            alt={`Flag of ${country}`}
            className='h-8 rounded-full shadow-md'
          />
        </div>
      ) : (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
        </div>
      )}
    </div>
  );
}

export default CountryIcon