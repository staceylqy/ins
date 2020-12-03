import React from "react";
import Head from "./Head";
import Blog from "./Blog";
import "./style.css";

const App = () => {
  
  return (
    <div>
      <Head />
      
      <div className="box2">
        <Blog />
      </div>
     
    </div>
  );
};

export default App;
