import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Members = () => {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      const societiesCollection = await getDocs(collection(db, 'societies'));
      setSocieties(societiesCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };

    fetchSocieties();
  }, []);

  return (
    <div>
      <h2>Society Members</h2>
      {societies.map(society => (
        <div key={society.id}>
          <h3>{society.name}</h3>
          <ul>
            {society.members && society.members.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Members;
