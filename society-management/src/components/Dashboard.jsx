import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [societies, setSocieties] = useState([]);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchSocieties = async () => {
      // Fetch all societies from Firestore
      const societiesCollection = await getDocs(collection(db, 'Socities'));
      setSocieties(societiesCollection.docs.map(doc => ({
        id: doc.id, // Use document ID as the unique identifier
        ...doc.data() // Fetch the data (name, description, members, etc.)
      })));
    };

    fetchSocieties();
  }, []);

  const joinSociety = async (societyId) => {
    if (!currentUser) return alert('You must be logged in to join a society');
    
    const societyRef = doc(db, 'societies', societyId);
    const societyDoc = await societyRef.get();
    
    const existingMembers = societyDoc.exists() ? societyDoc.data().members : [];

    // Add the current user's email to the members array (if not already a member)
    if (!existingMembers.includes(currentUser.email)) {
      await updateDoc(societyRef, {
        members: [...existingMembers, currentUser.email],
      });
    } else {
      alert('You are already a member of this society');
    }
  };

  return (
    <div>
      <h2>Societies</h2>
      <div>
        {societies.map(society => (
          <div key={society.id} className="society-card">
            <h3>{society.name}</h3>
            <p>{society.description}</p>
            {currentUser && (
              <button onClick={() => joinSociety(society.id)}>
                {society.members?.includes(currentUser.email) ? 'Already a member' : 'Join Society'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




