import React from "react";
import ReactDOM from "react-dom";

const el = (
  <div title="welcome to react"> 
    <h1>An introduction to React</h1>
    <p id="introduction">
      <span className="text-bold">React</span>&nbsp;is a JS library for building UI
    </p>
  </div>
);

ReactDOM.render(el, document.getElementById('root'));