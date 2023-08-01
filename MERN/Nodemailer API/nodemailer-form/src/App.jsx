import React, { useState } from "react";
import './App.css';

const App = () => {
  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleStateChange = (e) => {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/send", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ mailerState }),
    });
    const resData = await response.json();
    if (resData.status === "success") alert("Message Sent");
    else alert("Message failed to send");
    setMailerState({ email: "", name: "", message: "" });
  };

  return (
    <>
      <div>
        <form onSubmit={submitEmail}>
          <fieldset>
            <legend>React NodeMailer Contact Form</legend>
            <input placeholder='Type Name Here' onChange={handleStateChange} name='name' value={mailerState.name} />
            <input placeholder="Type Email Here" onChange={handleStateChange} name='email' value={mailerState.email} />
            <textarea placeholder='Type your Message Here...' onChange={handleStateChange} name='message' value={mailerState.message} />
            <br />
            <button>Send Message</button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default App;
