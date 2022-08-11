import React, { useState } from "react";
import FormInput from "./FormInput";
import CustomButton from "./custom-button/CustomButton";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserCredentials({...userCredentials, email: "", password: "" });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = async (e) => {
    const { value, name } = e.target;
    setUserCredentials({...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form>
        <FormInput
          handleChange={handleChange}
          label="Email"
          type="email"
          name="email"
          value={email}
          required
        />
        <FormInput
          handleChange={handleChange}
          label="Password "
          type="password"
          name="password"
          value={password}
          required
        />
        <div className="buttons">
          <CustomButton onClick={handleSubmit}>Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
