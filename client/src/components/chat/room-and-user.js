
import styles from './styles.module.css';
import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { HiUserGroup } from 'react-icons/hi';
import { BiExit } from 'react-icons/bi';
import { Divider, Typography } from '@mui/material';

const RoomAndUsers = ({ socket, username, room }) => {
    const [state, setState] = React.useState({
        left: false
      });
  const [roomUsers, setRoomUsers] = useState([]);
//   console.log("tr",typeof(roomUsers))
// console.log("r",roomUsers)
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
        data=[{id:"CookWell",username:'CookWell Bot',room:'JavaScript'},...data]
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{margin:'3px'}}>
      <Typography variant="h6" noWrap component="div" style={{fontWeight:'900'}}>&nbsp;<HiUserGroup/> &nbsp;Online Participants</Typography>
      </div>
      <Divider />
      <List>
      {roomUsers.map((user,index) => (
            <ListItem style={{
                fontWeight: `${(user.username === username ||user.username === 'CookWell Bot') ? 'bold' : 'normal'}`,
                color: `${(user.username === 'CookWell Bot') ? 'rgb(0, 24, 111)' : 'black'}`,
              }} key={index}>
                <span className={styles.circle} ></span>
              {user.username}
            </ListItem>
          ))}
      </List>
      
    </Box>
  );

  return (
    <>
        {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <button className={styles.btn} onClick={toggleDrawer(anchor, true)} title='Online Participants'>
                <span className={styles.sendbutton}><HiUserGroup/></span>
            </button>
            <button className={styles.btn} onClick={leaveRoom} title='Leave Chat'>
                <span className={styles.sendbutton}><BiExit/></span>
            </button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
     </>
  );
};

export default RoomAndUsers;