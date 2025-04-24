import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = () => {
  const [active, setActive] = useState('Home');

  const menuItems = ['Home', 'Flight', 'Taxi', 'Cruise Ship'];

  return (
    <ul className="flex space-x-6 text-gray-700 font-medium">
      {menuItems.map((item) => (
        <li key={item}>
          <Link
            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} // Converts 'Cruise Ship' to '/cruise-ship'
            onClick={() => setActive(item)}
            className={`px-4 py-2 rounded-xl transition duration-300 ${
              active === item ? 'bg-sky-400 text-white' : 'hover:text-blue-500'
            }`}
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItem;
