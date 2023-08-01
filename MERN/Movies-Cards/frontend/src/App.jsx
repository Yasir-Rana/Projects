import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import AddMovie from "./components/AddMovies/AddMovie";
import ShowMovie from "./components/ShowMovies/ShowMovie";
import Dashboard from "./components/Dashboard/Dashboard";
import UpdateMovie from "./components/UpdateMovies/UpdateMovie";
import "./App.css";

const App = () => {
  return (
    <>
      <div className='navbar'>
        <NavLink to='/addMovies' activeClassName='active'>Add Movies</NavLink>
        <NavLink to='/showMovies' activeClassName='active'>Show Movies</NavLink>
        <NavLink to='/dashboard' activeClassName='active'>Dashboard</NavLink>
      </div>
      <Routes>
        <Route path='/' element={<ShowMovie />} />
        <Route path='/addMovies' element={<AddMovie />} />
        <Route path='/showMovies' element={<ShowMovie />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/updateMovies/:id' element={<UpdateMovie />} />
      </Routes>
    </>
  );
};

export default App;
