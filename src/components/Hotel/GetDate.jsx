import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt} from 'react-icons/fa'

const GetDate = ({startDate,endDate,setStartDate,setEndDate}) => {
    const datePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };
  return (
    <div className="relative w-full mb-4 md:mb-0 flex-grow">
      <DatePicker
        selected={startDate}
        onChange={datePickerChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        className=" w-[330px] md:w-[680px] md:mb-4 lg:mb-0 lg:w-[300px]  text-center  border border-gray-300 p-3 pl-4 rounded-lg"
        placeholderText="Check-in Date — Check-out Date"
      />
      <div className="absolute left-8 top-4 text-gray-500">
        <FaCalendarAlt />
      </div>
    </div>
  )
}

export default GetDate