import React, { useState } from 'react';

function Home({ username, onLogout }) {
  const [selectedName, setSelectedName] = useState('');
  const [numOfCards, setNumOfCards] = useState(0);
  const [nameList, setNameList] = useState([
    'Name 1',
    'Name 2',
    'Name 3',
    'Name 4',
    'Name 5',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const handleCardChange = (count) => {
    setNumOfCards(count);
  };

  const handleNameSearch = (query) => {
    setSearchQuery(query);
    // Filter the name list based on the search query
    const filteredNames = nameList.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setNameList(filteredNames);
  };

  const handleNameSelect = (name) => {
    // Toggle the selected status of the name
    const updatedSelectedNames = selectedNames.includes(name)
      ? selectedNames.filter((selected) => selected !== name)
      : [...selectedNames, name];
    setSelectedNames(updatedSelectedNames);
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
        {nameList.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
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
              <h2>Search Name:</h2>
              <input
                type="text"
                placeholder="Search name"
                value={searchQuery}
                onChange={(e) => handleNameSearch(e.target.value)}
              />
              <h2>Select Names:</h2>
              {nameList.map((name, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={name}
                      checked={selectedNames.includes(name)}
                      onChange={() => handleNameSelect(name)}
                    />{' '}
                    {name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;