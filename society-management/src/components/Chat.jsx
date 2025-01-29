import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';  // Import useAuth to get current user
import '../styles/Chat.css';

const Chat = () => {
  const { currentUser } = useAuth(); // Get the current authenticated user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: currentUser?.uid || '', // Use currentUser's UID if logged in
        timestamp: new Date()
      });

      setNewMessage(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error); // Log any errors
    }
  };

  return (
    <div className="chat-container card">
      <h2>Society Chat</h2>
      <div className="messages">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`message ${msg.userId === currentUser?.uid ? 'sent' : 'received'}`} // Display sent/received messages accordingly
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input-field message-input"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default Chat;
