import React from "react";
import { NavLink } from "react-router-dom";
import classes from './navigation.module.css'

const Navigation = () => {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li><NavLink activeClassName={classes.active} to='/home'>HOME</NavLink></li>
            <li><NavLink activeClassName={classes.active} to='/products'>PRODUCTS</NavLink></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
