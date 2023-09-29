import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../cards/firebase';
import todo from "../../assets/todo_list.jpg"

const GetCards = () => {
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


    // useEffect(() => {
    //     // Find the selected user and update the selectedUserCards state
    //     const selectedUser = cards.find((card) => card.name === selectedName);
    //     if (selectedUser) {
    //       setSelectedUserCard(selectedUser.cardno || "");
    //     } else {
    //       setSelectedUserCard("");
    //     }
    //   }, [selectedName, cards]);



    const filteredItems = cards.filter((card) => {
        if (filter === 'arrived') {
            return card.arrived
            // &&
            // const comp = card.arrived.length
            // setComp(card.arrived);
        } else if (filter === 'not-arrived') {
            return !card.arrived;
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
                        value="arrived"
                        checked={filter === 'arrived'}
                        onChange={() => setFilter('arrived')}
                    />
                    {" "} Arrived
                    ({filter === 'arrived' ? filteredItems.length : 0})
                    {/* ({cards.arrived ? cards.arrived.length : 0}) */}
                </label>
                <label className="m-2">
                    <input
                        type="radio"
                        name="filter"
                        value="not-arrived"
                        checked={filter === 'not-arrived'}
                        onChange={() => setFilter('not-arrived')}
                    />
                    {" "} Not Arrived
                    ({filter === 'not-arrived' ? filteredItems.length : 0})
                </label>
            </div>

            <form className="addItems"
                // onSubmit={(event) => {
                //     event.preventDefault();
                //     addItem(event.target.elements.text.value);
                //     event.target.reset();
                // }}
            >
                <input type="text" name="text" placeholder="✍ Search Cards..." required />
                <i className="fa fa-search add-btn" title="Search Card" type="submit" />
            </form>

            <ul className='showItems'>
                {filteredItems.map((card, index) => {

                    return (
                        <div className={card.arrived ? 'eachItem2 justify-content-center' : 'eachItem justify-content-center'} key={index}>

                            <h3
                                style={{
                                    // textDecoration: card.arrived ? 'line-through' : 'none',
                                    color: card.arrived ? 'black' : 'white',
                                    // paddingLeft: '1rem'
                                }}
                                // onClick={() => updateAllCards(card)}
                            >
                                {card.cardno} Assigned To {" "}
                                {card.name}
                            </h3>
                           
                        </div>
                    )

                })}
            </ul>

        </div>
    </div>
</div>
  )
}

export default GetCards