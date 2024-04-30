import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MessagesReceived from './messages';
import SendMessage from './send-message';

import { IoArrowBackSharp } from "react-icons/io5";
import styles from './styles.module.css';

const Chat = ({ room, socket }) => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const username=user?.result?.name;
  const navigate=useNavigate()
    useEffect(()=>{
      if(!user){
        navigate('/auth')
      }
    },[user,navigate])
    useEffect(()=>{
        socket.emit('join_room', { username, room });
    },[room,username,socket])
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  return (
    <div className={styles.outerContainer}>
      <div className='back' title="Back" onClick={()=>navigate('/')}>
       <IoArrowBackSharp/> 
      </div>
      <h1 style={{textAlign:'center',fontSize:'4vh',textShadow:'1px 1px black'}}>CookWell Forum</h1>
      <div className={styles.innerContainer}>
        <MessagesReceived socket={socket} username={username} />
        <SendMessage socket={socket} username={username} room={room} />
        {/* <RoomAndUsers socket={socket} username={username} room={room}/> */}
      </div>
    </div>
  );
};

export default Chat;