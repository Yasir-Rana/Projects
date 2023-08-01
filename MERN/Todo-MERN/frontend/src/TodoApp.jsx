import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./TodoApp.css";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

// Get Todo
    useEffect(() => {
      const handleGetTodo = () => {
        axios.get("http://127.0.0.1:3000/api/todo").then((res) => {
            setTodos(res.data)
        }).catch((ex) => {
            console.log(ex);
        })
      }
      handleGetTodo();
    }, [])
    


  // Add Todo 
  const handleAddTodo = async(e) => {
    e.preventDefault();
      const todoObj = {
        todo: inputValue,
      }
      axios.post("http://127.0.0.1:3000/api/todo", todoObj).then((res) => {
        setInputValue(""); 
        setTodos([...todos, res.data]);
      }).catch((ex) => {
        console.log(ex);
      })
    }

// Update Todo
const handleUpdateTodo = async(id, newTodo) => {
    axios.put(`http://127.0.0.1:3000/api/todo/${id}`, {todo: newTodo}).then((res) => {
    const updatedTodos = todos.map((todo) =>  id === todo._id ? {...todo, todo: newTodo} : todo);
    setTodos(updatedTodos)
}).catch((ex) => {
    console.log(ex);
})
}    

// Delete Todo
const handleDeleteTodo = async(id) => {
    axios.delete(`http://127.0.0.1:3000/api/todo/${id}`).then((res) => {
        const deletedTodos = todos.filter((todo) => id !== todo._id);
        setTodos(deletedTodos);
    }).catch((ex) => {
        if ((ex.response && ex.response.status === 404) || (ex.response && ex.response.status === 400)) {
          console.log("Todo Not Found");
        }
      });
}    
  
  return (
   <>
   <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo} className="input-container">
        <input type="text" name="todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter a Todo..." required />
        <button type="submit">Add</button>
      </form>
    </div> 
        <TodoItem todos={todos} onUpdateTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo}  />
   </>
  );
};

export default TodoApp;
