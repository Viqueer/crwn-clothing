import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage"
import ShopPage from './pages/shoppage/ShopPage';
import Header from './components/Header';
import "./app.scss"


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<HomePage/> }/>
        <Route  path="/shop" element={<ShopPage/>}/>
      </Routes>
    </div>
  );
}

export default App;