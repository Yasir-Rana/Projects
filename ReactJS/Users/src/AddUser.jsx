import Card from "./Card";
import Button from './Button'
import classes from './CSS/AddUser.module.css';
import ErrorModal from "./ErrorModal";
import { useState } from "react";



const AddUser = (props) => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error,setError] = useState()

    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({title: 'Invalid Input', message: 'Please Enter Non-empty Values'})
            return;
        }
        if(+enteredAge<1){    //  enteredAge is a 'String' while +enteredAge is a 'Number' i.e '+' is used for type-conversion 
            setError({title: 'Invalid Age', message: 'Please Enter a Valid Age > 0'})
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
        
    }
    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    } 

    return(
        <>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter the Name" value={enteredUsername} onChange={usernameChangeHandler} />
            <label htmlFor="age">Age</label>
            <input type="number" id="age" placeholder="Enter the Age" value={enteredAge} onChange={ageChangeHandler} />
            <Button type="submit">Add User</Button>
        </form>
        </Card>
        </>
    )
}
export default  AddUser;