import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserDetail from './UserDetail';
import AutoComplete from './AutoComplete';
import GetDate from './GetDate';

const HotelSearch = () => {
    const suggestedResult = useSelector((state) => state.suggest.suggestResult);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [adults, setAdults] = useState(1);
    const [child, setChild] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [childAges, setChildAges] = useState([]);
    

    const handleSearch = async () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

        let navigateUrl = `/properties?locale=en-gb&room_number=${rooms}&checkin_date=${formattedStartDate}&checkout_date=${formattedEndDate}&filter_by_currency=USD&dest_id=${suggestedResult?.dest_id}&dest_type=${suggestedResult?.dest_type}&adults_number=${adults}&order_by=popularity&units=metric`;

        if (child !== 0 && childAges.length > 0) {
            navigateUrl += `&children_number=${child}&children_ages=${childAges.join(',')}`;
        }
        navigate(navigateUrl);
    };

    const handleGuestsDone = ({ adults, children, rooms, childAges }) => {
        setAdults(adults);
        setChild(children);
        setRooms(rooms);
        setChildAges(childAges);
    };

    return (
        <div className="bg-white text-center p-4 md:p-6 rounded-lg shadow-lg relative top-[70px] w-full max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-4">
                <div className="relative w-full text-center mb-4 lg:mb-0">
                    <AutoComplete />
                </div>
                <GetDate startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                 {/* user Detail  */}
                <UserDetail
                    onDone={handleGuestsDone}
                    adults={adults}
                    setAdults={setAdults}
                    rooms={rooms}
                    setRooms={setRooms}
                    child={child}
                    setChild={setChild}
                    childAges={childAges}
                    setChildAges={setChildAges}
                />
                <button className="w-full lg:w-auto bg-sky-500 text-white p-3 rounded-lg hover:bg-blue-700" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default HotelSearch;
