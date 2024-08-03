import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export const ContactCard = ({contact,recepient,setRecepient}) => {
    const [isActive,setIsActive] = useState(recepient?.find((cont) => cont.id === contact._id));
    const selectionHandler = () => {
        let newList = [];
        if(isActive){
            newList = recepient.filter((cont) => cont.id !== contact._id);
            setIsActive(0);
        }
        else{
            const cont = {
                name : contact.name,
                serialized : contact.serialized,
                id : contact._id
            }
            newList = [...recepient,cont];
            setIsActive(1);
        }
        setRecepient(newList);
    }
    return (
        <div onClick={selectionHandler} className="flex justify-between items-center h-full w-full p-2 bg-stone-900 rounded border-2 border-stone-700 cursor-pointer hover:bg-stone-800">
            <div>{contact.name}</div>
            {isActive ? <FaCheck className="text-green-600" size={16}/> : null}
        </div>
    )
}