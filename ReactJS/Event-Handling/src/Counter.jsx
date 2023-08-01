import { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import classes from './Counter.module.css';

function Counter() {
  const [count, setCount] = useState(0)

  const incrementHandler = () => {
    setCount(count + 1)
  }

  const decrementHandler = () => {
    if (count > 0) {
      setCount(count - 1)
    } else {
      setCount(0)
      alert("The Number can't be Negative....")
    }
  }

  return (
    <>
      <div className={classes.parent}>
      <div className={classes.child}>
      <h2>Counter App</h2>
        <h1 className={classes.heading}>{count}</h1>
        <Button variant="contained" size="large" onClick={incrementHandler} style={{ margin: 10 }}><AddIcon /></Button>
        <Button variant="contained" size="large" onClick={decrementHandler}><RemoveIcon /></Button>
        </div>
      </div>
    </>
  )
}

export default Counter
