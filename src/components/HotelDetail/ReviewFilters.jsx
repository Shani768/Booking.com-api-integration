import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line react/display-name
const ReviewFilters = React.memo(({ onFilterChange }) => {
    const [reviewFilters, setReviewFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});
    const prevIdRef = useRef();

    const { id } = useParams();

    useEffect(() => {
        if (prevIdRef.current === id) {
            setLoading(false);
            return;
        }


        const language_id = [
            { id: 'en-gb', name: 'United Kingdom' },
            { id: 'en-us', name: 'United States' },
            { id: 'de', name: 'Germany' },
            { id: 'nl', name: 'Netherlands' },
            { id: 'fr', name: 'France' },
            { id: 'es', name: 'Spain' },
            { id: 'es-ar', name: 'Argentina' },
            { id: 'es-mx', name: 'Mexico' },
            { id: 'ca', name: 'Catalonia' },
            { id: 'it', name: 'Italy' },
            { id: 'pt-pt', name: 'Portugal' },
            { id: 'pt-br', name: 'Brazil' },
            { id: 'no', name: 'Norway' },
            { id: 'fi', name: 'Finland' },
            { id: 'sv', name: 'Sweden' },
            { id: 'da', name: 'Denmark' },
            { id: 'cs', name: 'Czech Republic' },
            { id: 'hu', name: 'Hungary' },
            { id: 'ro', name: 'Romania' },
            { id: 'ja', name: 'Japan' },
            { id: 'zh-cn', name: 'China' },
            { id: 'zh-tw', name: 'Taiwan' },
            { id: 'pl', name: 'Poland' },
            { id: 'el', name: 'Greece' },
            { id: 'ru', name: 'Russia' },
            { id: 'tr', name: 'Turkey' },
            { id: 'bg', name: 'Bulgaria' },
            { id: 'ar', name: 'Arabic' },
            { id: 'ko', name: 'South Korea' },
            { id: 'he', name: 'Israel' },
            { id: 'lv', name: 'Latvia' },
            { id: 'uk', name: 'Ukraine' },
            { id: 'id', name: 'Indonesia' },
            { id: 'ms', name: 'Malaysia' },
            { id: 'th', name: 'Thailand' },
            { id: 'et', name: 'Estonia' },
            { id: 'hr', name: 'Croatia' },
            { id: 'lt', name: 'Lithuania' },
            { id: 'sk', name: 'Slovakia' },
            { id: 'sr', name: 'Serbia' },
            { id: 'sl', name: 'Slovenia' },
            { id: 'vi', name: 'Vietnam' },
            { id: 'tl', name: 'Philippines' },
            { id: 'is', name: 'Iceland' }
        ];


        const fetchHotelData = async () => {
            const options = {
                method: 'GET',
                // url: '/reviewMeta.json',
                url: `https://booking-com.p.rapidapi.com/v1/hotels/reviews-filter-metadata?hotel_id=${id}&locale=en-gb`,
                    headers: {
                      'x-rapidapi-host': 'booking-com.p.rapidapi.com',
                      'x-rapidapi-key': '24847262bbmsh2ee129512964a7bp143e64jsnc1df746ef874'
                    }
            };

            try {
                const response = await axios.request(options);
                setReviewFilters(response?.data);
                prevIdRef.current = id;
                // console.log('review meta ', response.data.filters[1])
            } catch (error) {
                setError('Error fetching hotel data');
                console.error('Error fetching hotel data:', error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchHotelData();
    }, [id]);

    const handleFilterChange = useCallback(
        (filterType, filterValue) => {
            setSelectedFilters((prevSelectedFilters) => ({
                ...prevSelectedFilters,
                [filterType]: filterValue
            }));
            onFilterChange({ [filterType]: filterValue });
        },
        [onFilterChange]
    );

    const language_id = [
        { id: 'en-gb', name: 'United Kingdom' },
        { id: 'en-us', name: 'United States' },
        { id: 'de', name: 'Germany' },
        { id: 'nl', name: 'Netherlands' },
        { id: 'fr', name: 'France' },
        { id: 'es', name: 'Spain' },
        { id: 'es-ar', name: 'Argentina' },
        { id: 'es-mx', name: 'Mexico' },
        { id: 'ca', name: 'Catalonia' },
        { id: 'it', name: 'Italy' },
        { id: 'pt-pt', name: 'Portugal' },
        { id: 'pt-br', name: 'Brazil' },
        { id: 'no', name: 'Norway' },
        { id: 'fi', name: 'Finland' },
        { id: 'sv', name: 'Sweden' },
        { id: 'da', name: 'Denmark' },
        { id: 'cs', name: 'Czech Republic' },
        { id: 'hu', name: 'Hungary' },
        { id: 'ro', name: 'Romania' },
        { id: 'ja', name: 'Japan' },
        { id: 'zh-cn', name: 'China' },
        { id: 'zh-tw', name: 'Taiwan' },
        { id: 'pl', name: 'Poland' },
        { id: 'el', name: 'Greece' },
        { id: 'ru', name: 'Russia' },
        { id: 'tr', name: 'Turkey' },
        { id: 'bg', name: 'Bulgaria' },
        { id: 'ar', name: 'Arabic' },
        { id: 'ko', name: 'South Korea' },
        { id: 'he', name: 'Israel' },
        { id: 'lv', name: 'Latvia' },
        { id: 'uk', name: 'Ukraine' },
        { id: 'id', name: 'Indonesia' },
        { id: 'ms', name: 'Malaysia' },
        { id: 'th', name: 'Thailand' },
        { id: 'et', name: 'Estonia' },
        { id: 'hr', name: 'Croatia' },
        { id: 'lt', name: 'Lithuania' },
        { id: 'sk', name: 'Slovakia' },
        { id: 'sr', name: 'Serbia' },
        { id: 'sl', name: 'Slovenia' },
        { id: 'vi', name: 'Vietnam' },
        { id: 'tl', name: 'Philippines' },
        { id: 'is', name: 'Iceland' }
      ];
      
    if (loading) {
        return <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
      </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mx-auto p-6 space-y-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">Sort by:</p>
                        <select
                            className="p-2 border rounded-md "
                            value={selectedFilters.sort || ''}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                        >
                            {reviewFilters?.sort?.categories?.map((category) => (
                                <option key={category?.id} value={category?.id} >
                                    {category?.display_value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="space-x-2 flex flex-wrap">
                        {reviewFilters?.filters?.slice(0, 1).map((filter) => (
                            <div key={filter.id} className="space-y-2">
                                <label className="font-medium">{filter.id}</label>
                                <select
                                    className="p-2 border rounded-md w-full"
                                    value={selectedFilters[filter.id] || ''}
                                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                >
                                    <option value="">{filter.default_display_value_with_count}</option>
                                    {filter.categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.display_value_with_count || category.display_value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}


                        <div className="flex items-center space-x-6">
                            <div className="space-x-2 flex mt-[35px] ml-[30px] flex-wrap">
                                <label className="font-bold mt-[8px]">Language:</label>
                                <select
                                    className="p-2 border rounded-md"
                                    value={selectedFilters.language || ''}
                                    onChange={(e) => handleFilterChange('language', e.target.value)}
                                >
                                    <option value="">Select Language</option>
                                    {language_id.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name} {/* Display the language name */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">{reviewFilters?.filters?.[3]?.title}</h3>
                <div className="flex flex-wrap gap-2">
                    {reviewFilters?.filters?.[3]?.categories.map((topic) => (
                        <button
                            key={topic.id}
                            className={`bg-blue-100 py-1 px-3 rounded-full border ${selectedFilters.topic === topic.id ? 'bg-blue-400' : ''}`}
                            onClick={() => handleFilterChange('topic', topic.id)}
                        >
                            + {topic.display_value} ({topic.count})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ReviewFilters;
