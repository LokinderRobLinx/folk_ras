import React, { useState } from 'react';

const AddCustomers = () => {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    const numCards = parseInt(inputValue);

    if (!isNaN(numCards) && numCards > 0) {
      // Create an array of cards with numbers starting from 1
      const newCards = Array.from({ length: numCards }, (_, index) => `Card ${index + 1}`);
      setCards([...cards, ...newCards]);
      setInputValue('');
    }
  };

  const deleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div>
      <form className="addItems" onSubmit={formSubmit}>
        <input
          type="number"
          name="text"
          placeholder="✍ Enter number of cards..."
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" title="Add Cards">
          <i className="fa fa-plus" />
        </button>
      </form>

      <ul className="showItems">
        {cards.map((item, index) => {
          return (
            <div className="eachItem" key={index}>
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
    </div>
  );
};

export default AddCustomers;