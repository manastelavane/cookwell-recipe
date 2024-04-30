import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Messages = ({ socket , username}) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null); 

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

 
  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  function formatDateFromTimestamp(timestamp) {    
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => 
        (msg.username==="ChatBot" || msg.username===undefined)?(
          <>
            <div className={styles.messagecontainer3} key={i}>
              <div className={styles.message3} >
                <p className={styles.msgText}>{msg.message}</p>
              </div>
            </div>
          </>
        ):
        username===msg.username?(
          <div className={styles.messagecontainer1} key={i}>
            <div className={styles.msgMeta2}>
                {formatDateFromTimestamp(msg.__createdtime__)}
            </div>
            <div className={styles.message1} >
              <span className={styles.msgMeta1}>{msg.username}</span>
              <p className={styles.msgText}>{msg.message}</p>
            </div>
          </div>
        ):(
          <div className={styles.messagecontainer2} key={i}>
            <div className={styles.message2} >
              <span className={styles.msgMeta1}>{msg.username}</span>
              <p className={styles.msgText}>{msg.message}</p>
            </div>
            <div className={styles.msgMeta2}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Messages;