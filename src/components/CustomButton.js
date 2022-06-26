import React from "react";
import { Link } from "react-router-dom";

function CustomButton({children,isGoogleSignIn, inverted, href="#", ...otherProps}) {
  return (
    <Link
      className={`${inverted ? "inverted" : ""} ${isGoogleSignIn ? "google-sign-in" : ""
        } custom-button`} to={`${href}`}
      {...otherProps}>
      {children}
    </Link>
  );
}

export default CustomButton;