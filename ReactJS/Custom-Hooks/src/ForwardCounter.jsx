import React from "react";
import Card from "./Card";
import useCounter from "./use-counter";

const ForwardCounter = () => {
  const count = useCounter(true);

  return <Card>{count}</Card>;
};

export default ForwardCounter;
