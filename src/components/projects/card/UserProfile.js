import React, { useState, useEffect } from 'react';
import { db } from '../todo2/firebase';

function UserProfile({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Create a Firestore query to find the user with the matching username
    const userQuery = db.collection('users').where('username', '==', username);

    // Subscribe to the query
    const unsubscribe = userQuery.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        // If a matching user is found, retrieve their data
        const userData = snapshot.docs[0].data();
        setUser(userData);
      } else {
        // Handle the case when no matching user is found
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [username]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other user data fields here */}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default UserProfile;