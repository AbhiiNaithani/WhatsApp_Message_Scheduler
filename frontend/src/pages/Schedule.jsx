
import axios from "axios";
import "flatpickr/dist/themes/dark.css";
import { useEffect, useRef, useState } from "react";

import Flatpickr from "react-flatpickr";
import { MdOutlinePersonSearch } from "react-icons/md";
import { Banckend_URL } from "../constants";
import { ContactCard } from "../components/contactCard";
import { RecepientCard } from "../components/recepientCard";
import Loader from 'react-js-loader'



export const Schedule = () => {
    const today = new Date();
    const id = localStorage.getItem('userId');
    const inputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [scheduleAt, setScheduleAt] = useState('');
    const [recepient,setRecepient] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [showContacts, setShowContacts] = useState(0);
    const [isLoading,setIsLoading] = useState(0);

    const messageInputHandler = (e) => {
        setMessage(e.target.value);
    };
    const dateInputHandler = ([date]) => {
        // console.log(date);
        setScheduleAt(date);
    };
    const recipientInputHandler = (e) => {
        // setMessage(e.target.value);
        const filtered = allContacts.filter((contact) => {
            return (contact.name.toLowerCase().includes(e.target.value.toLowerCase()) || contact.number?.includes(e.target.value));
        })
        setFilteredContacts([...filtered]);
    };

    const getAllContacts = async() => {
        const response = await axios.get(Banckend_URL + `/getContacts/${id}`);
        // console.log(response.data);
        setAllContacts(response.data.contacts);
        setFilteredContacts(response.data.contacts);

    }
    const showContactsHandler = () => {
        if(showContacts){
            setShowContacts(0);
        }
        else{
            inputRef.current.focus();
        }
    }

    const scheduleMessageHandler = async () => {
        // console.log('message: ', message);
        // console.log('scheuleAt: ', scheduleAt);
        // console.log('recepient: ', recepient);
        if(message === '' || scheduleAt === '' || recepient.length === 0){
            alert('Please fill all the required fields !!');
            return;
        }
        // api call to schedule task
        setIsLoading(true);
        await axios.post(Banckend_URL + `/scheduleMessage`,{
            message : message,
            mediaFilePath : "" ,
            mediaUrl : "", 
            to : recepient, 
            from : localStorage.getItem('userId'),
            scheduleAt : scheduleAt,
        })

        setMessage('');
        setScheduleAt('');
        setRecepient([]);
        
        setIsLoading(false);
    }

    useEffect(() => {
        getAllContacts();
    },[]);
    
    return(isLoading? <div className='flex h-full w-full justify-center'>
        <Loader type="spinner-cub" bgColor={'#25D366'} size={60} />
      </div> :
        <div className="flex h-full w-full justify-between ">
                <div className="h-full w-1/2">
                    <textarea value={message} onInput={messageInputHandler} placeholder="Type here....." className="bg-stone-900 rounded-md resize-none border-2 border-stone-700 h-1/2 w-full overflow-y-auto p-2" />
                    <div className="flex justify-end mb-2">
                        <div onClick={scheduleMessageHandler} className="w-1/4 h-1/10 bg-green-600 rounded-md border-2 border-stone-700 hover:bg-green-700 text-center p-2 cursor-pointer">
                            Schedule
                        </div>
                    </div>
                    <div className="w-full h-2/5 grid grid-cols-4 gap-1 overflow-y-auto">
                    {recepient.map((contact,key) => {
                        return (
                            <div key={key} className="h-12">
                                <RecepientCard showContacts={showContacts} showContactsHandler={showContactsHandler} contact={contact} recepient={recepient} setRecepient={setRecepient} />
                            </div>
                        )
                    })}
                    </div>
                </div>
                
                <Flatpickr
                    data-enable-time
                    value={scheduleAt}
                    className="h-10 bg-stone-900 p-2 rounded-md border-2 border-stone-700"
                    placeholder="Select a schedule time."
                    options={{ minDate: today }} 
                    onChange={dateInputHandler}
                />
                <div className="flex flex-col h-full w-1/4">
                    <div className="w-full flex items-center h-10 bg-stone-900 rounded-md p-2 rounded border-2 border-stone-700">
                        <MdOutlinePersonSearch onClick={showContactsHandler} className="text-white mr-2 hover:text-green-600 cursor-pointer" size={24}/>
                        <input ref={inputRef} onInput={recipientInputHandler} onFocus={() => setShowContacts(1)}  className="w-full h-full bg-stone-900 focus:outline-none focus:border-transparent " placeholder="Find recepient here"  type='search'/>
                    </div>
                    {showContacts? <div className="h-full w-full overflow-y-auto py-2">
                        {filteredContacts.map((contact) => {
                            return(
                                <div key={contact._id} className="w-full mb-2">
                                    <ContactCard contact={contact} recepient={recepient} setRecepient={setRecepient} />
                                </div>
                            )
                        })}
                    </div>: 
                    null
                    }
                    
                </div>
                
        </div>
    )
}