import axios from "axios";
import { useEffect, useState } from "react"
import { Banckend_URL } from "../constants";
import { ScheduleCard } from "../components/scheduleCard";
import Loader from 'react-js-loader'

export const CompletedSchedules = () => {
    const [completedSchedules, setCompletedSchedules] = useState([]);
    const id = localStorage.getItem('userId');
    const [isLoading,setIsLoading] = useState(1);

    const getCompletedSchedules = async() => {
        setIsLoading(true);
        const response = await axios.get(Banckend_URL + `/getCompletedMessages/${id}`);
        setCompletedSchedules(response.data.completedMessages);
        setIsLoading(false);
    }
    useEffect(() => {
        getCompletedSchedules();
    },[])

    return(isLoading? <div className='flex h-full w-full justify-center'>
        <Loader type="spinner-cub" bgColor={'#25D366'} size={60} />
      </div> :
        <div className="w-full h-full overflow-y-auto">
            {completedSchedules.map((schedule) => {
                return(
                    <div key={schedule._id} className="w-full h-1/6">
                        <ScheduleCard schedule={schedule} callbackFn={getCompletedSchedules}/>
                    </div>
                )
            })}
        </div>
    )
}