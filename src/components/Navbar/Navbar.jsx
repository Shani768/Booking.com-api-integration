import NavItem from './NavItem';
import CountryIcon from './CountryIcon';
import MobileSideBar from './MobileSideBar';


const Navbar = () => {
   
  return (
    <>
    <div className='flex items-center justify-between p-4 shadow-md bg-gray-50' >
      <div>
       <span className='text-2xl font-bold text-sky-500'>Trip.</span>
       </div>
       <div className=' hidden  md:flex space-x-8  '>
       <NavItem />
       </div>
       <CountryIcon />
       <MobileSideBar />
     </div>
    </>
  )
}

export default Navbar