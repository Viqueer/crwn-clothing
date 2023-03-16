import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header/Header";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/SignInAndSignUpPage";
import "./app.scss";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/userActions";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props; // from the reducer action

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // store the user to the firebase firestore

        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            // store the data in the redux store
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            exact
            path="/shop/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ShopPage />
              </Suspense>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout />
              </Suspense>
            }
          />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
