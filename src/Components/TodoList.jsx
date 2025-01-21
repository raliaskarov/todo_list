import React, { useState } from 'react';
import './TodoList.css';


const TodoList = () => {
  
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});
  const handleAddTodo = () => {
    if (headingInput.trim() != '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') { // check if the input is not empty
      const newTodos = [...todos]; // copy the todos array
      newTodos[index].lists.push(listInputs[index]); // access todo at position of index and add the new input (listInputs[index]) to the todo's 'lists' array
      setTodos(newTodos); // Call the state setter to update the todos with our modified copy (newTodos). This triggers React to re-render with the updated data.
      setListInputs({...listInputs, [index]: ''}); // We spread the old listInputs object into a new one and set the value for [index] to an empty string. This clears the input field after adding the list.
    }
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value});
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}} // onchange handler
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
          {todos.map((todo, index) => ( // iterate over the todos array and idetify each todo with an index
            <div key={index} className='todo-card'>
              <div className='heading_dodo'>
              <h3>{todo.heading}</h3> {/* Display the heading here */}
              <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>

              <ul> {/* display list */}
                    {todo.lists.map((list, listIndex) => (
                      <li key={listIndex} className='todo_inside_list'>
                        <p>{list}</p>
                      </li>
                    ))}
                  </ul>

              <div className='add_list'>
                  <input
                  type='text'
                  className='list-input'
                  placeholder='Add List'
                  value={listInputs[index] || ''}
                  onChange={(e) => handleListInputChange(index, e.target.value)}/>
                  <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
                  </div>
              </div>
              </div>
          ))}
        
      </div>
    </>
  );
};

export default TodoList;
