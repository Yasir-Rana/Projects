import { useState } from "react";
import AddUser from "./AddUser (using Refs)";
import DisplayUser from "./DisplayUser";


const App = () => {
  const [usersList,setUsersList] = useState([])

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {name: uName, age: uAge, id: Math.random().toString()}];
    });
  };
   
  return (
    <>
    <AddUser onAddUser={addUserHandler}></AddUser>
    <DisplayUser users={usersList}></DisplayUser>
    </>
  )
}

export default App;
