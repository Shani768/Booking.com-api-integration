import React from 'react'

const Trending = () => {
    const destinations = [
        {
          name: 'New York',
          country: 'USA',
          image: '/new_york.jpg',
        },
        {
          name: 'Sydney',
          country: 'Australia',
          image: '/sydney.jpg',
        },
        {
          name: 'Maldives',
          country: 'ML',
          image: '/maldives.jpg',
        },
      ];
  return (
    <div className="px-6 py-2 mx-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <div key={destination.name} className="relative">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
            {destination.name} {destination.country}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Trending