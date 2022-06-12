import React from "react";
import "./navbarlogin.css";
import img from "../../assets/img/img-login.png";

let sectionStyle = {
  width: "100%",
  height: "100vh",

  // backgroundPosition: 'center',
  backgroundSize: "cover",
  backgroundRepeat: "no-repseat",
  backgroundImage: `url(${img})`,
};

function navbar() {
  return (
    <div className="main-login" style={sectionStyle}>
      <div className="login-contain"></div>

      <form></form>
    </div>
  );
}
export default navbar;
