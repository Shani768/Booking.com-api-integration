import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const UserDetail = ({ onDone, adults, setAdults, rooms, setRooms, child, setChild, childAges, setChildAges }) => {
    const [showGuestsInput, setShowGuestsInput] = useState(false);
    const [guestSummary, setGuestSummary] = useState('1 adults · 0 children - 1 rooms');
    
    const handleAdultsChange = (change) => {
        setAdults(Math.max(1, adults + change));
    };

    const handleChildrenChange = (change) => {
        const newChildrenCount = Math.max(0, child + change);
        if (newChildrenCount > child) {
            setChild(newChildrenCount);
            setChildAges((prevAges) => [...prevAges, null]);
        } else {
            setChild(newChildrenCount);
            setChildAges((prevAges) => prevAges.slice(0, newChildrenCount));
        }
    };

    const handleRoomsChange = (change) => {
        setRooms(Math.max(1, rooms + change));
    };

    const handleChildrenAgeChange = (index, age) => {
        const newAges = [...childAges];
        newAges[index] = age;
        setChildAges(newAges);
    };

    const handleDone = () => {
        const summary = `${adults} adults · ${child} children - ${rooms} rooms`;
        setGuestSummary(summary);
        onDone({ adults, children: child, rooms, childAges, guestSummary: summary });
        setShowGuestsInput(false);
    };

    return (
        <div className="relative w-full text-sm text-center flex-grow mb-4 lg:mb-0">
            <div
                className="w-full border border-gray-300 p-3 pl-10 rounded-lg cursor-pointer"
                onClick={() => setShowGuestsInput(!showGuestsInput)}
            >
                {guestSummary}
            </div>
            {showGuestsInput && (
                <div className="absolute z-10 bg-white w-full text-center p-4 shadow-lg rounded-lg">
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block mb-1">Adults</label>
                            <div className="flex items-center justify-center">
                                <button className="px-2 py-1 border rounded-l" onClick={() => handleAdultsChange(-1)}>
                                    -
                                </button>
                                <span className="px-4">{adults}</span>
                                <button className="px-2 py-1 border rounded-r" onClick={() => handleAdultsChange(1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Children</label>
                            <div className="flex items-center justify-center">
                                <button className="px-2 py-1 border rounded-l" onClick={() => handleChildrenChange(-1)}>
                                    -
                                </button>
                                <span className="px-4">{child}</span>
                                <button className="px-2 py-1 border rounded-r" onClick={() => handleChildrenChange(1)}>
                                    +
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {Array.isArray(childAges) && childAges.map((_, index) => (
                                    <select
                                        key={index}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        value={childAges[index] || ''}
                                        onChange={(e) => handleChildrenAgeChange(index, e.target.value)}
                                    >
                                        <option value="">Age needed</option>
                                        {[...Array(18).keys()].map((age) => (
                                            <option key={age} value={age}>
                                                {age}
                                            </option>
                                        ))}
                                    </select>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Rooms</label>
                            <div className="flex items-center justify-center">
                                <button className="px-2 py-1 border rounded-l" onClick={() => handleRoomsChange(-1)}>
                                    -
                                </button>
                                <span className="px-4">{rooms}</span>
                                <button className="px-2 py-1 border rounded-r" onClick={() => handleRoomsChange(1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <label className="block mb-1">Traveling with pets?</label>
                            <label className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="toggle-checkbox"
                                    checked={travelingWithPets}
                                    onChange={() => setTravelingWithPets(!travelingWithPets)}
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                        </div> */}
                        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700" onClick={handleDone}>
                            Done
                        </button>
                    </div>
                </div>
            )}
            <div className="absolute left-3 top-3 text-gray-500">
                <FaUser />
            </div>
        </div>
    );
};

export default UserDetail;
