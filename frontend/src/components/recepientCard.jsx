import { RxCross2 } from "react-icons/rx";
export const RecepientCard = ({contact,recepient,setRecepient,showContactsHandler,showContacts}) => {
    const deleteHandler = () => {
        const newList = recepient.filter((cont) => cont.id !== contact.id);
        setRecepient([...newList]);
        if(showContacts){
            showContactsHandler();
        }
    }
    return (
        <div onClick={deleteHandler} className="flex justify-between items-center bg-stone-900 h-full w-full rounded border-2 border-stone-700 p-1 cursor-pointer hover:bg-stone-800">
            <div className="text-xs">{contact.name}</div>
            <RxCross2 className="text-red-600" size={24}/>
        </div>
    )
}