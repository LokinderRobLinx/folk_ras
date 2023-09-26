
import React, { useState } from 'react';
import { db } from '../todo2/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import UserProfile from './UserProfile';

function GetUser() {
  const [searchName, setSearchName] = useState('');
  const [userData, setUserData] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const data = await getUserByName(searchName);
//       setUserData(data);
//     } catch (error) {
//       console.error('Error retrieving user data:', error);
//     }
//   };
const handleSearch = async (e) => {
    e.preventDefault(e);
    if (searchName === '') {
        alert('Please enter a valid name');
        return;
    }
    // const querySnapshot = await db
    //       .collection('users')
    //       .where('name', '==', searchName)
    //       .get();

    const Data = onSnapshot.docs[0].data();
    setUserData(Data);

    // const q = query(collection(db, 'users'));
    // setUserData(q)
    console.log(Data)
};
const handleSearch1 = async (e) => {
    e.preventDefault(e);
     // Create a Firestore query to find the user with the matching username
     const userQuery = db.collection('users').where('name', '==', searchName);
    //  const userQuery = query(collection(db(where('name', '==', searchName)), 'users'))

     // Subscribe to the query
     const unsubscribe = userQuery.onSnapshot((snapshot) => {
       if (!snapshot.empty) {
         // If a matching user is found, retrieve their data
         const userData = snapshot.docs[0].data();
         setUserData(userData);
       } else {
         // Handle the case when no matching user is found
         setUserData(null);
       }
     });
 
     // Clean up the listener when the component unmounts
     return () => unsubscribe();
};


  return (
    <div>
      <h2>Get User</h2>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={handleSearch1}>Search</button>
      {userData && (
        <div>
          <h3>User Data</h3>
          {/* <p>Name: {userData[0].Name}</p>
          <p>Card Number: {userData[0].Cards}</p> */}
          <p>{userData[0]}</p>
        </div>
      )}
    </div>
  );
}

export default GetUser;