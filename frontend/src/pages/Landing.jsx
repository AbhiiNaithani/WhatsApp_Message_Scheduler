import { useEffect, useState } from 'react';
import {Outlet,Link, useNavigate} from 'react-router-dom';
import { Banckend_URL } from '../constants';
import axios from 'axios';
import Loader from 'react-js-loader'
import { FaPlus, FaListUl, FaCheck, FaClipboard, FaSignOutAlt} from "react-icons/fa";



export const Landing = () => {
    const id = localStorage.getItem('userId');
    const [userData, setUserData] = useState({});
    const [activeTab,setActiveTab] = useState(1);
    const navigate = useNavigate();

    const addScheduleHandler = () => {
        setActiveTab(1);
        navigate('addSchedule');
    }

    const allScheduleHandler = () => {
        setActiveTab(2);
        navigate('allSchedules');
    }

    const pendingScheduleHandler = () => {
        setActiveTab(3);
        navigate('pendingSchedules');
    }

    const completedScheduleHandler = () => {
        setActiveTab(4);
        navigate('completedSchedules');
    }
    const logOutHandler = () => {
        localStorage.removeItem('userId');
        navigate('/');
    }

    const getUserData = async() => {
        const response = await axios.get(Banckend_URL + `/getUserDetails/${id}`);
        console.log(response);
        setUserData(response.data);
    }
    useEffect(() => {
        getUserData();
    },[])
    return(id == null? <div className='flex h-screen justify-center'>
        <Loader type="spinner-cub" bgColor={'#25D366'} size={60} />
      </div> :
      <div className='flex flex-col h-screen w-full px-6 pt-4'>
        <div className='flex items-center mb-6'>
              <img className='h-14 w-14' src='https://img.icons8.com/?size=100&id=16713&format=png&color=000000'/>
              <div className='text-lg font-bold ml-2 font-serif'>
                WhatsApp Message Scheduler
              </div>
        </div>
        <div className='flex h-5/6 justify-between items-center'>
            <div className='flex flex-col justify-between items-center h-full w-1/5  bg-stone-800 rounded-md border-2 border-green-700 py-4'>
                <div className='flex flex-col items-center text-md'>
                    <img className='h-20 w-20 rounded-full border-2 border-green-700 mb-2' src={userData?.profilePic}/>
                    <div className=''>{userData?.userName}</div>
                    <div>{userData?.phoneNumber}</div>
                </div>
                <div className='flex flex-col w-full text-lg'>
                    <div onClick={addScheduleHandler} className={`px-4 py-2 hover:text-green-700 cursor-pointer ${activeTab === 1 ? 'active' : ''}`}><FaPlus className='inline align-middle mr-4' size={18} /> Add Schedule</div>
                    <div onClick={allScheduleHandler} className={`px-4 py-2 hover:text-green-700 cursor-pointer ${activeTab === 2 ? 'active' : ''}`}><FaListUl className='inline align-middle mr-4' size={18} /> All Schedules</div>
                    <div onClick={pendingScheduleHandler} className={`px-4 py-2 hover:text-green-700 cursor-pointer ${activeTab === 3 ? 'active' : ''}`}><FaClipboard className='inline align-middle mr-4' size={18} /> Pending</div>
                    <div onClick={completedScheduleHandler} className={`px-4 py-2 hover:text-green-700 cursor-pointer ${activeTab === 4 ? 'active' : ''}`}><FaCheck className='inline align-middle mr-4' size={18} /> Completed</div>
                </div>
                <div onClick={logOutHandler} className='px-4 hover:text-green-700 cursor-pointer text-lg'><FaSignOutAlt className='inline align-middle' size={24} />  Log Out</div>
            </div>
            <div className='flex h-full w-3/4 bg-stone-800 rounded-md border-2 border-green-700 p-4'>
                <Outlet/>
            </div>
        </div>
      </div>
        
    )
}