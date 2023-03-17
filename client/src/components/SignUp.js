import React, {useState} from "react";

import FormInput from "./FormInput";
import CustomButton from "./custom-button/CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

import "../app.scss";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user: userAuth } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserProfileDocument(userAuth, { displayName });

      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({...userCredentials, [name]: value });
  };

  
  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign Up with your email and password</span>

      <form className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton onClick={handleSubmit}>SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
