import React, { useState } from "react";
import { db } from "../cards/firebase";
import { addDoc, collection } from "firebase/firestore";

function AddUser({ username }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState([]);
  const [cards, setCards] = useState([]);

  const [inputValue, setInputValue] = useState("");
  //   const [cardNumber, setCardNumber] = useState([]);

  const addCard = (text) => {
    // const newItems = [...cards, { text, arrived: false }];
    const newItems = [...cards, text];
    setCards(newItems);
  };
  const deleteCard = (index) => {
    const newItems = [...cards];
    newItems.splice(index, 1);
    setCards(newItems);
    // console.log(cards)
  };

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

  //   const handleAddUser = async () => {
  //     try {
  //       await addUser(name, cardNumber);
  //       console.log('User data added to Firebase');

  //     } catch (error) {
  //       console.error('Error adding user data:', error);
  //     }
  //   };

  const checkUser = async (e) => {
    e.preventDefault(e);
    console.log(cards);
    console.log(name);
  };

  const createUser = async (e) => {
    e.preventDefault(e);
    if (name === "") {
      alert("Please enter a valid name");
      return;
    } else if (cards.length === 0) {
      alert("Please enter cards details");
      return;
    }
    await addDoc(collection(db, "users"), {
      name: name,
      cards: cards,
    });
    await cards.map((n, i) =>
      addDoc(collection(db, "allcards"), {
        cardno: n,
        arrived: false,
        name: name,
      })
    );

    // addDoc(collection(db, "allcards"), {
    //   cardno: inputValue,
    //   arrived: false,
    //   name: name
    // });

    setName("");
    setCardNumber([]);
    setCards([]);
    alert("User data submitted");
  };

  const createCard = async (e) => {
    e.preventDefault(e);
    if (cards.length === 0) {
      alert("Please enter cards details");
      return;
    }
    await cards.map((n, i) =>
      addDoc(collection(db, "allcards"), {
        cardno: n,
        arrived: false,
        name: username,
      })
    );

    setName("");
    setCardNumber([]);
    setCards([]);
    alert("Cards data submitted");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addCard(e.target.elements.text.value);
    e.target.reset();
  };

  return (
    <div className="justify-content-center">
      <h1 className="mb-4 text-success">Add Users</h1>

      {/* <input
        type="text"
        placeholder="Enter CardNumber"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      /> */}
      <form className="addItems">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </form>

      <form className="addItems" onSubmit={formSubmit}>
        <input type="text" name="text" placeholder="✍ Add cards..." required />
        <i className="fa fa-plus add-btn" title="Add Card" type="submit" />
        {/* <button type="submit" title="Add Card">
          <i className="fa fa-plus" />
        </button> */}
      </form>

      <ul className="showItems">
        {cards.map((item, index) => {
          return (
            <div
              className={item.arrived ? "eachItem2" : "eachItem"}
              key={index}
            >
              <h3>{item}</h3>
              <div className="todo-btn">
                <i
                  className="far fa-trash-alt add-btn"
                  title="Delete Item"
                  onClick={() => deleteCard(index)}
                ></i>
              </div>
            </div>
          );
        })}
      </ul>

      <button onClick={createUser}>Add User</button>
      <button onClick={checkUser}>Check User</button>
      <button onClick={createCard}>Add Card</button>

      {/* <ul className="showCards">
          {cardNumber.map((item, index) => (
            <span key={index} className="tag">
              <Cards card={item} />
              <button onClick={() => removeItem(index)}>x</button>
            </span>
          ))}
       </ul> */}

      {/* <li className="li">
        <div className="cardList">
          <h3>{cardNumber}</h3>
        </div>
      </li> */}
    </div>
  );
}

export default AddUser;
