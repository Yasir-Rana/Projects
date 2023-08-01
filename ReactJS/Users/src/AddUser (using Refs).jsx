import React, { useRef, useState } from "react";
import Card from "./Card";
import Button from './Button';
import classes from './CSS/AddUser.module.css';
import ErrorModal from "./ErrorModal";

const AddUser = (props) => {
  const userNameRef = useRef();
  const userAgeRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const userName = userNameRef.current.value;
    const userAge = userAgeRef.current.value;

    if (userName.trim().length === 0 || userAge.trim().length === 0) {
      setError({ title: 'Invalid Input', message: 'Please Enter Non-empty Values' })
      return;
    }
    if (+userAge < 1) {
      setError({ title: 'Invalid Age', message: 'Please Enter a Valid Age > 0' })
      return;
    }

    props.onAddUser(userName, userAge);
    userNameRef.current.value = '';
    userAgeRef.current.value = '';
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />} 
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter the Name" ref={userNameRef} />
          <label htmlFor="age">Age</label>
          <input type="number" id="age" placeholder="Enter the Age" ref={userAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  )
};

export default AddUser;
