import React, {useState} from "react";

const TodoItem = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSave = (id) => {
    if (editText.trim() !== "") {
      onUpdateTodo(id, editText);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditText("");
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li className="todo-item" key={todo._id}>
          {editingId === todo._id ? (
            <div className="edit-container">
              <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button className="save-button" onClick={() => handleSave(todo._id)}> Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <>
              <div className="todo-text">{todo.todo}</div>
              <div className="button-container">
                <button className="edit-button" onClick={() => handleEdit(todo._id, todo.todo)}>Edit</button>
                <button className="delete-button" onClick={() => onDeleteTodo(todo._id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
