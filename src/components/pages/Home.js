import React, { useState } from 'react';

function Home({ username, onLogout}) {
  const [selectedName, setSelectedName] = useState('');
  const [numOfCards, setNumOfCards] = useState(0);

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const handleCardChange = (count) => {
    setNumOfCards(count);
  };

  const handleLogout = () => {
    // Call the onLogout function to log the user out
    onLogout();
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <button onClick={handleLogout}>Logout</button>
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
          <div>
            {Array.from({ length: numOfCards }, (_, index) => (
              <div key={index} className="card">
                {selectedName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;