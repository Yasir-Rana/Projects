import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const App = () => {
  let time = "What Time is it?";
  let newTime = new Date().toLocaleTimeString();
  const [t, setTime] = useState(time);

  const getTime = () => {
    setTime(newTime);
  };
  
  const [count,setCount] = useState(0);
  const increment = () => {
    setCount(count+1);
    console.log(count);
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "230px" }}>      
        <h1>{t}</h1>
        <button type="button" className="btn btn-primary btn-lg p-2 w-25" onClick={getTime}> Get Time </button>

        <br/><br/>
        
        <h2>{count}</h2>
        <button type="button" className="btn btn-primary btn-lg p-2 w-25" onClick={increment}> Click </button>
      </div>
    </>
  );
}

export default App;
