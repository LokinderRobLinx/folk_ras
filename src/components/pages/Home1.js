import React, { useState } from 'react';

function Home({ username, onLogout }) {
  const [selectedName, setSelectedName] = useState('');
  const [numOfCards, setNumOfCards] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const handleCardChange = (count) => {
    setNumOfCards(count);
    // Clear the selected cards when changing the number of cards
    setCardList([]);
  };

  const handleCardSelection = (index) => {
    // Toggle the selection status of the card at the given index
    const updatedCardList = [...cardList];
    updatedCardList[index].selected = !updatedCardList[index].selected;
    setCardList(updatedCardList);
  };

  const handleCardSubmit = () => {
    // You can perform actions on the selected cards here
    // For example, mark or unmark selected cards
    // In this example, we're just displaying the selected status
    console.log(cardList);
  };

  const handleSearch = (query) => {
    // Filter the card list based on the search query
    const filteredList = cardList.filter((card) =>
      card.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchQuery(query);
    setCardList(filteredList);
  };

  return (
    <div>
      <div className="navbar">
        <span>Welcome, {username}!</span>
        <button onClick={onLogout}>Logout</button>
      </div>
      <h2>Select a Name:</h2>
      <select onChange={(e) => handleNameChange(e.target.value)}>
        <option value="">Select a Name</option>
        <option value="Name 1">Name 1</option>
        <option value="Name 2">Name 2</option>
        <option value="Name 3">Name 3</option>
      </select>
      {selectedName && (
        <div>
          <h2>Number of Cards:</h2>
          <input
            type="number"
            value={numOfCards}
            onChange={(e) => handleCardChange(e.target.value)}
          />
          {numOfCards > 0 && (
            <div>
              <h2>Search Card:</h2>
              <input
                type="text"
                placeholder="Search card by name"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <h2>Card Selection:</h2>
              {cardList.map((card, index) => (
                <div
                  key={index}
                  className={`card ${card.selected ? 'selected' : ''}`}
                  onClick={() => handleCardSelection(index)}
                >
                  {card.name}
                </div>
              ))}
              <button onClick={handleCardSubmit}>Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;