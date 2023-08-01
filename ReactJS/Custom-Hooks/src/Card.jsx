import React from "react";

const Card = (props) => {
  const classes = {
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
    padding: "20px",
    fontSize: "30px",
  };
  return (
    <>
      <div style={classes}>{props.children}</div>
    </>
  );
};

export default Card;
