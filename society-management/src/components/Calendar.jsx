// src/components/Calendar.jsx
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = await getDocs(collection(db, 'events'));
      setEvents(eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'events'), {
      ...newEvent,
      timestamp: new Date()
    });
    setNewEvent({ title: '', date: '', description: '' });
  };

  return (
    <div className="card">
      <h2>Society Calendar</h2>
      <form onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          className="input-field"
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
          className="input-field"
        />
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="card">
            <h3>{event.title}</h3>
            <p>{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;