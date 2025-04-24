import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const HotelPolicies = () => {
    const [policies, setPolicies] = useState({});
    const [visiblePolicy, setVisiblePolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const timeoutRef = useRef(null);  // Ref to store the timeout ID

    useEffect(() => {
        // Clear any existing timeout if the component re-renders before the 4 seconds
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a timeout to delay the fetch operation by 4 seconds
        timeoutRef.current = setTimeout(() => {
            const fetchHotelData = async () => {
                const options = {
                    method: 'GET',
                    url: `https://booking-com.p.rapidapi.com/v1/hotels/policies?locale=en-gb&hotel_id=${id}`,
                    headers: {
                        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
                        'x-rapidapi-key': import.meta.env.VITE_BOOKING_API_KEY
                    }
                };

                try {
                    const response = await axios.request(options);
                    setPolicies(response?.data);
                } catch (error) {
                    setError('Error fetching hotel data');
                    console.error('Error fetching hotel data:', error);
                } finally {
                    setLoading(false);
                }
            };

            setLoading(true);
            fetchHotelData();
        }, 4000); // Delay of 4 seconds

        // Cleanup function to clear the timeout if the component unmounts or re-renders
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [id]);

    const togglePolicyVisibility = (policyType) => {
        setVisiblePolicy(visiblePolicy === policyType ? null : policyType);
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 md:mx-32">
            <h2 className="text-2xl font-bold mb-4 text-center">Hotel Policies</h2>

            {policies?.policy?.map((policy, index) => (
                <div key={index} className="mb-4">
                    <div 
                        className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md"
                        onClick={() => togglePolicyVisibility(policy.type)}
                    >
                        <h3 className="text-md font-semibold">{policy.content[0]?.name}</h3>
                        {visiblePolicy === policy.type ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {visiblePolicy === policy.type && (
                        <div className="p-4 bg-gray-50 border rounded-md mt-2 shadow-inner">
                            {policy.content[0]?.ruleset?.map((ruleset, i) => (
                                <div key={i} className="mb-3">
                                    <strong className="block mb-1">{ruleset.name}</strong>
                                    <ul className="list-disc pl-5">
                                        {ruleset.rule.map((rule, j) => (
                                            <li key={j}>{rule.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {policy.content[0]?.text && (
                                <p className="text-gray-500 italic">{policy.content[0].text}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HotelPolicies;
