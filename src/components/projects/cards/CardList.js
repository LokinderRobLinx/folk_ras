import React, { useEffect, useState } from 'react';
import todo from "../../assets/todo_list.jpg"
import "./todo.css"
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../todo2/firebase';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [comp, setComp] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedName, setSelectedName] = useState("");
    const [selectedUserCard, setSelectedUserCard] = useState("");

   
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
        newCards[index].assigned = !newCards[index].assigned;
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

    const handleCardClick = (cardId) => {
        // Update the selected user's cards in Firebase with the "assigned" status
        const updatedUsers = cards.map((card) => {
          if (card.name === selectedName) {
            // card.cards.forEach((card) => {
              
                card.assigned = true;
              
            // });
          }
          return card;
        });
    
        // Update Firestore with the new data
        db.collection('users').doc(selectedName).set({ cards: updatedUsers[0].cards }, { merge: true });

      };

      // Update allcards in firebase
  const updateAllCards = async (cards) => {
    await updateDoc(doc(db, "allcards", cards.id), {
      assigned: !cards.assigned,
    });
  };

   // Delete cards in firebase
   const deleteCard = async (card) => {
    await deleteDoc(doc(db, "allcards", card.id));
  };

    const filteredItems = cards.filter((card) => {
        if (filter === 'assigned') {
            return card.assigned
            // &&
            // const comp = card.assigned.length
            // setComp(card.assigned);
        } else if (filter === 'not-assigned') {
            return !card.assigned;
        } else {
            return true;
        }
    });

    return (
        <div className='justify-content-center w-100'>
            <h1 className=" mb-4 text-success">Card List</h1>

            <div className="main-div ">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Mennage Card List Here ✌</figcaption>
                    </figure>
                    {cards.length < 1 ? null : (
                        <p >{`You have ${cards.length} cards in your list`}</p>
                    )}

                    <div >
                        <label className="m-2">
                            <input
                                type="radio"
                                name="filter"
                                value="all"
                                checked={filter === 'all'}
                                onChange={() => setFilter('all')}
                            />
                            {" "}All
                            ({cards.length})
                        </label >
                        <label className="m-2">
                            <input
                                type="radio"
                                name="filter"
                                value="assigned"
                                checked={filter === 'assigned'}
                                onChange={() => setFilter('assigned')}
                            />
                            {" "} Assigned
                            ({filter === 'assigned' ? filteredItems.length : 0})
                        </label>
                        <label className="m-2">
                            <input
                                type="radio"
                                name="filter"
                                value="not-assigned"
                                checked={filter === 'not-assigned'}
                                onChange={() => setFilter('not-assigned')}
                            />
                            {" "} Not Assigned
                            ({filter === 'not-assigned' ? filteredItems.length : 0})
                        </label>
                    </div>

                    <form className="addItems"
                        // onSubmit={(event) => {
                        //     event.preventDefault();
                        //     addItem(event.target.elements.text.value);
                        //     event.target.reset();
                        // }}
                    >
                        <input type="text" name="text" placeholder="✍ Add Cards..." required />
                        <i className="fa fa-plus add-btn" title="Add Card" type="submit" />
                    </form>

                    <ul className='showItems'>
                        {filteredItems.map((card, index) => {

                            return (
                                <div className={card.assigned ? 'eachItem' : 'eachItem2'} key={index}>
                                    <input onChange={() => updateAllCards(card)} type='checkbox' checked={card.assigned ? 'checked' : ''} />

                                    <h3
                                        style={{
                                            // textDecoration: card.assigned ? 'line-through' : 'none',
                                            color: card.assigned ? 'black' : 'white',
                                            // paddingLeft: '1rem'
                                        }}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        {card.cardno} Assigned To {" "}
                                        {card.name}
                                    </h3>
                                    <div className="todo-btn">
                                        <i className="far fa-trash-alt add-btn" title="Delete card" onClick={() => deleteCard(card)}></i>
                                    </div>
                                </div>
                            )

                        })}
                    </ul>
                    {/* {filteredItems.length < 1 ? null : (
                        <p >{`You have ${filteredItems.length} todos in your list`}</p>
                    )} */}

                </div>
            </div>
        </div>
    );
};

export default CardList;
