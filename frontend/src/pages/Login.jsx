import { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import axios from "axios";
import {io} from "socket.io-client";
import {useNavigate} from 'react-router-dom';
import Loader from 'react-js-loader'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { SOCKET_SERVER_URL } from '../constants';

// const socket = io("http://localhost:3000",{});


export const Login = () => {

  const [qrCode, setQrCode] = useState("");
  const [session, setSession] = useState(0);
  const [qrLoading, setQrLoading] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  const startSession = async () => {
    console.log('starting session');
    socket.emit('startSession');
    setQrLoading(true);
    setSession(1);
    // navigate('/landing/addSchedule');
  }


  useEffect(() => {
    // Create a new socket connection
    setLoading(true);
    const newSocket = io(SOCKET_SERVER_URL, {});
    setSocket(newSocket);
    setLoading(false);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);
 
  useEffect(() => { 
    if(socket){
      socket?.emit('connected', 'Hello from the Client');
      if(session){
        socket.on('qr', (data) => {
          console.log('qr ', data.qr);
          setQrCode(data.qr);
          setQrLoading(false);
        })

        socket.on('authenticated', (data) => {
          setLoading(true);
        })
        socket.on('ready',(data) => {
          console.log(data?.userId);
          setSession(0);
          setLoading(false);
          localStorage.setItem('userId',data.userId);
          navigate('/landing/addSchedule');
        })
      }
    }
    

    
  },[socket,session])

    return(loading ? <div className='flex h-screen justify-center'>
        <Loader type="spinner-cub" bgColor={'#25D366'} size={60} />
      </div> :
        <div className='flex h-screen items-center justify-center'>
          <div className='w-3/5 h-3/4'>
            <div className='flex items-center'>
              <img className='h-12 w-12' src='https://img.icons8.com/?size=100&id=16713&format=png&color=000000'/>
              <div className='text-md font-bold ml-2 font-sans'>
                WhatsApp Message Scheduler
              </div>
            </div>
            <div className='flex items-center justify-between rounded-md border-2 bg-stone-800 border-green-600 mt-4 p-10 shadow-md'>
              <div className='text-lg font-sans'>
                <p className='text-2xl mb-10'>Schedule WhatsApp messages from your computer.</p>
                <p className='mb-4'>1. Generate QR code.</p>
                <p className='mb-4'>2. Open WhatsApp on your phone.</p>
                <p className='mb-4'>3. Tap <span className='font-bold'>Menu</span><HiOutlineDotsVertical className='inline align-middle'/>on Android, or <span className='font-bold'>Settings </span><IoSettings className='inline align-middle' /> on Iphone.</p>
                <p className='mb-4'>4. Tap <span className='font-bold'>Linked devices</span> and then <span className='font-bold'>Link a device.</span></p>
                <p>5. Point your phone at this screen to capture the QR code.</p>
              </div>
              <div>
                {qrCode? 
                <QRCode className='rounded-md border-2 border-white' value={qrCode}/> : 
                qrLoading? <div className='mr-10'><Loader type="spinner-default"  bgColor={'#25D366'} size={50} /> </div>:
                <div onClick={startSession} className='bg-green-600 p-2 rounded-lg border-2 border-white font-bold hover:bg-green-700 cursor-pointer'>
                  Generate QR code
                </div>
                }
              </div>
            </div>

          </div>
            
        </div>
    )
}