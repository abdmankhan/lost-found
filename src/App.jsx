import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage"
import AddItem from "./pages/AddItem";
import ItemsList from './pages/ItemsList';
import MainLayout from "./pages/MainLayout";


const App = () => {

  return (
    <Router basename="/lost-found/">
      <Routes>
        <Route path="/" element = {<MainLayout/> } >
        <Route index element={<HomePage />} />
        <Route path="/list-item" element={<AddItem />} />
        <Route path="/items-list" element={<ItemsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
