
const getRandomClasses = () => {
    const sizes = [
      'row-span-1 col-span-1 h-48 w-[300px]',
      'row-span-1 col-span-2 h-48 ',
      'row-span-2 col-span-1 h-96 w-50',
      'row-span-2 col-span-2 h-96',
    ];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    return `rounded-md ${randomSize}`;
  };
  
  const RandomImageGallery = ({hotelPhotos}) => {
    
    return (
        <>
      <div className="p-6">
      {/* <h2 className="text-3xl font-bold mb-4">Random Image Gallery</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {hotelPhotos?.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden shadow-md rounded-lg transition-transform duration-500 ${getRandomClasses()}`}
          >
            <img
              src={image?.url_1440}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>




    </>
    );
  };
  
  export default RandomImageGallery;