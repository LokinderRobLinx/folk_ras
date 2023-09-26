import React, { useState } from 'react';
import searchName from './searchName';

function NameSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const names = await searchName(searchQuery);
      setSearchResults(names);
    } catch (error) {
      // Handle error
      console.error('Error searching for names:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for names"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NameSearch;