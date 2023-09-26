import React, { useState } from "react";
import { db } from "../todo2/firebase";
import { addDoc, collection } from "firebase/firestore";

function AddUser() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState([]);

  const [inputValue, setInputValue] = useState("");
  //   const [cardNumber, setCardNumber] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newItem = inputValue.trim();

      if (newItem) {
        setCardNumber([...cardNumber, newItem]);
        setInputValue("");
      }
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedItems = cardNumber.filter(
      (_, index) => index !== indexToRemove
    );
    setCardNumber(updatedItems);
  };

  //   const handleAddUser = async () => {
  //     try {
  //       await addUser(name, cardNumber);
  //       console.log('User data added to Firebase');

  //     } catch (error) {
  //       console.error('Error adding user data:', error);
  //     }
  //   };
  const createUser = async (e) => {
    e.preventDefault(e);
    if (name === "") {
      alert("Please enter a valid name");
      return;
    }
    await addDoc(collection(db, "users"), {
      name: name,
      cards: cardNumber,
    });
    await 
    
      cardNumber.map((n, i) => (
        addDoc(collection(db, "allcards"), {
          cardno: n,
          assigned: false,
          name: name
        })
      ))

      // addDoc(collection(db, "allcards"), {
      //   cardno: inputValue,
      //   assigned: false,
      //   name: name
      // });
    

    setName("");
    setCardNumber([]);
    alert("User data submitted")
  };

  return (
    <div>
      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter CardNumber"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      
      <button onClick={createUser}>Add User</button>

      {/* <ul className="showCards">
          {cardNumber.map((item, index) => (
            <span key={index} className="tag">
              <Cards card={item} />
              <button onClick={() => removeItem(index)}>x</button>
            </span>
          ))}
       </ul> */}
     
      <li className="li">
        <div className="cardList">
          <h3>{cardNumber}</h3>
        </div>
      </li>

    </div>
  );
}

export default AddUser;
