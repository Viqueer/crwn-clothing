import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage"
import ShopPage from './pages/shoppage/ShopPage';
import "./app.scss"


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage/> }/>
        <Route  path="/shop" element={<ShopPage/>}/>
      </Routes>
    </div>
  );
}

export default App;