import React, { useState } from 'react';

const EditPopup = ({ card, onUpdate, onCancel }) => {
  const [newName, setNewName] = useState(card.name);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = () => {
    // Here, you can implement your Firebase update logic.
    // Call the onUpdate function with the new name and card ID.
    onUpdate(card.id, newName);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Card</h2>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="New Card Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;