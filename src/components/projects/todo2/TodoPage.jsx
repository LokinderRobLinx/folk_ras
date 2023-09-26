import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import todo from "../../assets/todo_list.jpg";
import { db } from "./firebase";
import "./todo.css";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const TodoPage = () => {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [userNames, setuserNames] = useState([]);
  // const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedName, setSelectedName] = useState("");
  const [selectedUserCards, setSelectedUserCards] = useState([]);

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // Search names
  const searchName = async (e) => {
    e.preventDefault(e);
    if (searchTerm === "") {
      alert("Please enter a valid name");
      return;
    }
    // await
    const result = users.find((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (result) {
      setFoundUsers(result);
      console.log(users);
      console.log(foundUsers)
    } else {
      setFoundUsers(null);
    }

    setSearchTerm("");
  };

  // const searchUserByName = () => {
  //   const filteredUsers = users.filter((user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFoundUsers(filteredUsers);
  // };

  // const handleUserSelect = (user) => {
  //   setSelectedUser(user);
  //   setSearchTerm(user.name);
  //   setFoundUsers([]);
  // };

  // Read users from firebase
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
      setuserNames(users.name);
      console.log(users);
    });
    return () => unsubscribe();
  }, []);

  // Read cards from firebase
  useEffect(() => {
    const q = query(collection(db, "allcards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cardsArr = [];
      querySnapshot.forEach((doc) => {
        cardsArr.push({ ...doc.data(), id: doc.id });
      });
      setCards(cardsArr);
      console.log(users);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Find the selected user and update the selectedUserCards state
    const selectedUser = users.find((user) => user.name === selectedName);
    if (selectedUser) {
      setSelectedUserCards(selectedUser.cards || []);
      console.log(selectedUserCards);
    } else {
      setSelectedUserCards([]);
    }
  }, [selectedName, users]);

  const handleCardClick1 = (cardId) => {
    // Update the selected user's cards in Firebase with the "assigned" status
    const updatedUsers = users.map((user) => {
      if (user.name === selectedName) {
        user.cards.forEach((card) => {
          if (card.id === cardId) {
            card.assigned = true;
          }
        });
      }
      return user;
    });

    // Update Firestore with the new data
    db.collection("users")
      .doc(selectedName)
      .set({ cards: updatedUsers[0].cards }, { merge: true });
  };

  // Update cards in firebase
  const handleCardClick = async (card) => {
    // await updateDoc(doc(db, "allcards", card.id), {
    //   assigned: !card.assigned,
    // });
    console.log("you clicked on ", { card });
  };

  // Delete users
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <div className="justify-content-center w-100">
      <h1 className="mb-4 text-success">Users List</h1>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Check Your Cards Here ✌</figcaption>
          </figure>

          <form onSubmit={searchName} className="formToDo">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="✍ Search Name..."
              // className={style.input}
            />
            <i
              className="fa fa-check add-btn"
              title="Search Name"
              onClick={searchName}
            />
          </form>

          <div>
            {/* {foundUsers.length > 0 && (
              <ul>
                {foundUsers.map((user) => (
                  <li key={user.id} onClick={() => handleUserSelect(user)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            )} */}
            {foundUsers && (
              <div>
                <h2>User Found:</h2>
                <p>Name: {foundUsers.name}</p>
                {/* Display other user data here */}
              </div>
            )}
          </div>

          <div>
            <h1>Select a Name</h1>
            <select
              onChange={(e) => handleNameChange(e.target.value)}
              value={selectedName}
            >
              <option value="">Select a Name</option>
              {users.map((u, i) => (
                <option key={i} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            {selectedName && <p>Selected Name: {selectedName}</p> && (
              <h2>
                Cards for {selectedName} = {selectedUserCards.length}
              </h2>
            )}
            <ul className="showItems">
              {selectedUserCards.map((card, index) => {
                return (
                  <div className="eachItem2" key={index}>
                    {/* <input onChange={() => handleCardClick(card)} type='checkbox' checked={card.assigned ? 'checked' : ''} /> */}

                    <h3 onClick={() => handleCardClick(card)}>{card}</h3>
                  </div>
                );
              })}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default TodoPage;
