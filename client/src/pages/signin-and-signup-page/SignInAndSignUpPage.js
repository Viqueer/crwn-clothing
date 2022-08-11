import React from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

import "../../app.scss"

function SignInAndSignUpPage() {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp/>
    </div>
  )
}

export default SignInAndSignUpPage;