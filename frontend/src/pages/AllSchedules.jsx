import axios from "axios";
import { useEffect, useState } from "react"
import { Banckend_URL } from "../constants";
import { ScheduleCard } from "../components/scheduleCard";
import Loader from 'react-js-loader'

export const AllSchedules = () => {
    const [allSchedules, setAllSchedules] = useState([]);
    const id = localStorage.getItem('userId');
    const [isLoading,setIsLoading] = useState(1);

    const getAllSchedules = async() => {
        setIsLoading(true);
        const response = await axios.get(Banckend_URL + `/getAllScheduleMessages/${id}`);
        setAllSchedules(response.data.allScheduleMessages);
        setIsLoading(false);
    }
    useEffect(() => {
        getAllSchedules();
    },[])

    return(isLoading? <div className='flex h-full w-full justify-center'>
        <Loader type="spinner-cub" bgColor={'#25D366'} size={60} />
      </div> :
        <div className="w-full h-full overflow-y-auto">
            {allSchedules.map((schedule) => {
                return(
                    <div key={schedule._id} className="w-full h-1/6">
                        <ScheduleCard schedule={schedule} callbackFn={getAllSchedules}/>
                    </div>
                )
            })}
        </div>
    )
}