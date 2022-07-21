import React from "react";
import { Link } from "react-router-dom";
import { CustomButtonContainer } from "./customButtonStyles";

function CustomButton({children, href="#", ...otherProps}) {
  return (
    <CustomButtonContainer to={`${href}`}
      {...otherProps}>
      {children}
    </CustomButtonContainer>
  );
}

export default CustomButton;  