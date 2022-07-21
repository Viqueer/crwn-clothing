import React from "react";
import FormInput from "./FormInput";
import CustomButton from "./custom-button/CustomButton";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";
import {signInWithEmailAndPassword} from "firebase/auth";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({ email: "", password: "" });  
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = async (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value }); 

  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          <FormInput
            handleChange={this.handleChange}
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            label="Password "
            type="password"
            name="password"
            value={this.state.password}
            required
          />
          <div className="buttons">
            <CustomButton onClick={this.handleSubmit}>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
