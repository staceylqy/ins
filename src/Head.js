import React from "react";
import ImgPath from "./img/img.png";

function Head() {
  return (
    <div className="top">
      <img alt="" src={ImgPath} />
      <div className="naviall">
        <a href="#about" className="navi">
          ABOUT
        </a>
        <a href="#community" className="navi">
          COMMUNITY
        </a>
        <a href="#contact" className="navi">
          CONTACT
        </a>

      </div>
    </div>
  );
}

export default Head;