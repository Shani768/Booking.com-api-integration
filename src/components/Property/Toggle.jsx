import React, { useCallback, useState } from 'react';
import { FaSort } from 'react-icons/fa';

// Enum mapping for sort options
const SORT_OPTIONS = {
  popularity: "Popularity",
  class_ascending: "Class Ascending",
  class_descending: "Class Descending",
  distance: "Distance",
  upsort_bh: "Up Sort BH",
  review_score: "Review Score",
  price: "Price"
};

const Toggle = ({ setGetSorts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // Toggle dropdown visibility
  const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

  // Handle selection and pass the selected option to the parent component
  const handleSelection = (option) => {
    setSelected(SORT_OPTIONS[option] || option); // Set display name
    setGetSorts(option); // Pass the selected option to the parent component
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <span className="flex items-center">
            <FaSort className="mr-2" />
            Sort by: {selected || "Select"}
          </span>
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l4 4a1 1 0 11-1.414 1.414L10 5.414 6.707 8.707a1 1 0 01-1.414-1.414l4-4A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.keys(SORT_OPTIONS).map((sortKey) => (
              <button
                key={sortKey}
                onClick={() => handleSelection(sortKey)}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
              >
                {SORT_OPTIONS[sortKey]} {/* Display name */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Toggle;
