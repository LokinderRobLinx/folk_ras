import React, { useState } from 'react';
// import { FaRegTrashAlt } from 'react-icons/fa';
import './todo.css'

// const style = {
//     li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
//     liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
//     row: `flex`,
//     text: `ml-2 cursor-pointer`,
//     textComplete: `ml-2 cursor-pointer line-through`,
//     button: `cursor-pointer flex items-center`,
// };

const Todo = ({ users, toggleComplete, deleteTodo }) => {
    const [selectedName, setSelectedName] = useState("");

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

    return (
        <>
        <li className={users.completed ? 'liComplete' : 'li'}>
            <div className='todoList'>
                <input onChange={() => toggleComplete(users)} type='checkbox' checked={users.completed ? 'checked' : ''} />
                <h3 onClick={() => toggleComplete(users)} className={users.completed ? ' texth3 mx-2' : 'mx-2'}>
                    {users.name}
                </h3>
            </div>
            {/* <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteTodo(users.id)}></i> */}
            {/* <button onClick={() => deleteTodo(users.id)}>{<i className="far fa-trash-alt" title="Delete Item" />}</button> */}
        </li>

        {/* <div>
            <h1>Select a Name</h1>
            <select
              onChange={(e) => handleNameChange(e.target.value)}
              value={selectedName}
            >
              <option value="">Select a Name</option>
              {userNames.map((n, i) => (
                <option key={i} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {selectedName && <p>Selected Name: {selectedName}</p>}
          </div> */}
        </>
    );
};

export default Todo;
