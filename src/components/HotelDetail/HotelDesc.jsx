import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HotelMap from '../Map/HotelMap'; // Assuming you have this component

const HotelDesc = ({ hotelData }) => {
    const [desc, setDesc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();
    const prevIdRef = useRef();
    const timeoutRef = useRef(null);  // Ref to store the timeout ID

    useEffect(() => {
        // If the current id is the same as the previous one, do not fetch again
        if (prevIdRef.current === id) {
            setLoading(false);
            return;
        }

        // Set a timeout to delay the fetch operation by 2 seconds
        timeoutRef.current = setTimeout(() => {
            const fetchHotelData = async () => {
                const options = {
                    method: 'GET',
                    url: `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${id}&locale=en-gb`,
                    headers: {
                        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
                        'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY,
                    },
                };

                try {
                    const response = await axios.request(options);
                    setDesc(response?.data);
                    prevIdRef.current = id;  // Update the previous id after data is fetched
                } catch (error) {
                    setError('Error fetching hotel data');
                    console.error('Error fetching hotel data:', error);
                } finally {
                    setLoading(false);
                }
            };

            setLoading(true);
            fetchHotelData();
        }, 2000); // Delay of 2 seconds

        // Cleanup function to clear the timeout if component unmounts or re-renders
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [id]);

    const maxWords = 50;
    const words = desc?.description?.split(' ');

    // Function to toggle read more/less
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex mt-10 mx-10 justify-center'>
            <div className='font-serif text-md overflow-hidden w-[100%] md:w-[60%]'>
                {/* Conditional content based on state */}
                <p>
                    {isExpanded ? desc?.description : words?.slice(0, maxWords).join(' ') + (words?.length > maxWords ? '...' : '')}
                </p>
                {words?.length > maxWords && (
                    <button onClick={toggleExpand} className='text-blue-500'>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>
            <div className='hidden md:block w-[40%] h-[150px] ml-10'>
                <HotelMap hotelData={hotelData} />
            </div>
        </div>
    );
};

export default HotelDesc;
