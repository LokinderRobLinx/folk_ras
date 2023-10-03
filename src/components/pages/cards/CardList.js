import React, { useEffect, useState } from "react";
import todo from "../../assets/todo_list.jpg";
import "./todo.css";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import EditPopup from "./EditPopup";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [comp, setComp] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedUserCard, setSelectedUserCard] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // console.log(search);
  const searchKeys = ["cardno", "name"];

  // Read cards from firebase
  useEffect(() => {
    const q = query(collection(db, "allcards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cardsArr = [];
      querySnapshot.forEach((doc) => {
        cardsArr.push({ ...doc.data(), id: doc.id });
      });
      setCards(cardsArr);
      //   console.log(users);
    });
    return () => unsubscribe();
  }, []);

  // const deleteItem = (index) => {
  //     const newCards = [...cards];
  //     newCards.splice(index, 1);
  //     setCards(newCards);
  // };

  const toggleCompleted = (index) => {
    const newCards = [...cards];
    newCards[index].arrived = !newCards[index].arrived;
    setCards(newCards);
  };

  useEffect(() => {
    // Find the selected user and update the selectedUserCards state
    const selectedUser = cards.find((card) => card.name === selectedName);
    if (selectedUser) {
      setSelectedUserCard(selectedUser.cardno || "");
    } else {
      setSelectedUserCard("");
    }
  }, [selectedName, cards]);

  // Update allcards in firebase
  const updateAllCards = async (selectedCard) => {
    console.log("selectedCard:", selectedCard.id);
    await updateDoc(doc(db, "allcards", selectedCard.id), {
      arrived: !selectedCard.arrived,
    });
  };

  // Delete cards in firebase
  const deleteCard = async (card) => {
    await deleteDoc(doc(db, "allcards", card.id));
  };
  // Edit cards in firebase
//   const editCard = async (card) => {
//     console.log("editing", card);
//     await updateDoc(doc(db, "allcards", card.id), {
//       name: newName,
//     });
//   };
  // Define a function to open the edit popup
  const openEditPopup = (card) => {
    setSelectedCard(card);
    setIsEditing(true);
  };

  // Define a function to close the edit popup
  const closeEditPopup = () => {
    setSelectedCard(null);
    setIsEditing(false);
  };

//   Define a function to update the card data in Firebase
  const updateCardInFirebase = async (cardId, newName) => {
    console.log("editing", cardId);
        await updateDoc(doc(db, "allcards", cardId), {
          name: newName,
        });
        setSelectedCard(null);
        setIsEditing(false);
  };

  const filteredItems = cards.filter((card) => {
    if (filter === "arrived") {
      return card.arrived;
      // &&
      // const comp = card.arrived.length
      // setComp(card.arrived);
    } else if (filter === "not-arrived") {
      return !card.arrived;
    } else {
      return true;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = filteredItems
    .filter((item) =>
      searchKeys.some((key) =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredItems.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="justify-content-center w-100">
      <h1 className=" mb-4 text-success">Card List</h1>

      <div className="main-div ">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Mennage Card List Here ✌</figcaption>
          </figure>
          {cards.length < 1 ? null : (
            <p>{`There are ${cards.length} cards in the list`}</p>
          )}

          <div>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
              />{" "}
              All ({cards.length})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="arrived"
                checked={filter === "arrived"}
                onChange={() => setFilter("arrived")}
              />{" "}
              Arrived ({filter === "arrived" ? filteredItems.length : 0})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="not-arrived"
                checked={filter === "not-arrived"}
                onChange={() => setFilter("not-arrived")}
              />{" "}
              Not Arrived ({filter === "not-arrived" ? filteredItems.length : 0}
              )
            </label>
          </div>

          <form
            className="addItems"
            // onSubmit={(event) => {
            //     event.preventDefault();
            //     addItem(event.target.elements.text.value);
            //     event.target.reset();
            // }}
          >
            <input
              type="text"
              name="text"
              placeholder="✍ Search Card or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <i
              className="fa fa-search add-btn"
              title="Reset Search"
              onClick={() => setSearch("")}
            />
            {/* <i
              className="fa fa-search add-btn"
              title="Search Card"
              type="submit"
            /> */}
          </form>

          <ul className="showItems">
            {records
              //   .filter((item) =>
              //     searchKeys.some((key) =>
              //       item[key].toLowerCase().includes(search)
              //     )
              //   )
              .map((card, index) => {
                return (
                  <div
                    className={card.arrived ? "eachItem2" : "eachItem"}
                    key={index}
                  >
                    <input
                      onChange={() => updateAllCards(card)}
                      type="checkbox"
                      checked={card.arrived ? "checked" : ""}
                    />
                    <>
                      <h3
                        style={{
                          // textDecoration: card.arrived ? 'line-through' : 'none',
                          color: card.arrived ? "black" : "white",
                          // paddingLeft: '1rem'
                        }}
                        onClick={() => updateAllCards(card)}
                      >
                        {card.cardno} --- {card.name}
                      </h3>
                      <div className="todo-btn">
                        <i
                          className="far fa-edit"
                          title="Edit card"
                        //   onClick={() => editCard(card)}
                          onClick={() => openEditPopup(card)}
                        ></i>
                        <i
                          className="far fa-trash-alt add-btn"
                          title="Delete card"
                          onClick={() => deleteCard(card)}
                        ></i>
                      </div>
                    </>
                   
                  </div>
                );
              })}
          </ul>

           {/* Render the edit popup when editing is enabled */}
           {isEditing && (
                      <EditPopup
                        card={selectedCard}
                        onUpdate={updateCardInFirebase}
                        onCancel={closeEditPopup}
                      />
                    )}

          <div className="d-flex justify-content-center">
            <ul className="pagination m-2">
              <li className="page-link">
                <i
                  className="page-link fa-solid fa-backward"
                  title="Previous"
                  onClick={prePage}
                />
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <i className="page-link" onClick={() => changeCPage(n)}>
                    {" "}
                    {n}{" "}
                  </i>
                </li>
              ))}
              <li className="page-link">
                <i
                  className="page-link fa-solid fa-forward"
                  title="Next"
                  onClick={nextPage}
                />
              </li>
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

export default CardList;
