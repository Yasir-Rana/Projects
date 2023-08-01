import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Actress from './components/FindActresses/Actress';
import AddActress from './components/AddActresses/AddActress';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateActress from './components/UpdateActresses/UpdateActress';
import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Actress />} />
        <Route path="/addActresses" element={<AddActress />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updateActresses/:id" element={<UpdateActress />} />
      </Routes>
    </>
  )
};

export default App;
