import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Banckend_URL } from "../constants";

export const ScheduleCard = ({schedule,callbackFn}) => {
        const isPending = new Date(schedule.scheduleAt).getTime() > new Date().getTime();

        // The date string from the database
        const dateString = schedule.scheduleAt;

        // Convert it to a Date object
        const dateObject = new Date(dateString);

        // Extract the date and time
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(dateObject.getDate()).padStart(2, '0');

        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const seconds = String(dateObject.getSeconds()).padStart(2, '0');

        // Combine into a formatted string
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const deleteScheduleHandler = async() => {
            await axios.delete(Banckend_URL + `/stopScheduling/${schedule._id}`);
            callbackFn();
        }

    return(
        <div className="relative w-full h-full rounded border-2 border-stone-700 bg-stone-900 p-2 mt-2 overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col w-11/12">
                <div className="flex w-11/12"><span className="font-bold mr-1">Message: </span>{schedule.message}</div>
                <div className="flex"><span className="font-bold">To: </span>
                    <div className="flex">
                        {schedule.to.map((contact,key) => {
                            return(
                                <div key={key} className="ml-1">
                                    {contact.name},
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div><span className="font-bold">Schedule At: </span>{formattedDate} {formattedTime}</div>
            </div>
            <div className="absolute top-0 right-0">
            {isPending? <RxCross2 onClick={deleteScheduleHandler} className="text-red-600 font-bold hover:text-red-500 cursor-pointer" size={24}/> : null}
            </div>
        </div>
    )
}