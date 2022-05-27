import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from "./pages/home-page/HomePage"
import ShopPage from './pages/shop-page/ShopPage';
import SignInAndSignUpPage from './pages/signin-and-signup-page/SignInAndSignUpPage';
import "./app.scss"

import {auth} from "./firebase/firebase.utils";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

    });
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser }/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;