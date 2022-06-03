import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from "./pages/home-page/HomePage"
import ShopPage from './pages/shop-page/ShopPage';
import SignInAndSignUpPage from './pages/signin-and-signup-page/SignInAndSignUpPage';
import "./app.scss"

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {onSnapshot} from "firebase/firestore"


class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      onSnapshot(userRef, snapshot => { 
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        });
        console.log(this.state)
      })
      }
      this.setState({currentUser: userAuth})
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