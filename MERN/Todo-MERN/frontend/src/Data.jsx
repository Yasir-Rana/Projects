import React, {useEffect, useState} from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
const Data = () => {
    const [todos, setTodos] = useState([])


    useEffect(() => {
      const fetchData = () => {
        axios.get("http://127.0.0.1:3000/api/todo").then((res) => {
            console.log(res.data);
            setTodos(res.data)
        }).catch((ex) => {
            console.log(ex);
        })
      }
      fetchData();
    }, [])

    const handleUpdateTodo = () => {
        // add
    }
    const handleDeleteTodo = () => {
        // add
    }
    
  return (
    <>
      <h1>Data</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </>
  )
};

export default Data;
