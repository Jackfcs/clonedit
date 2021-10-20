import React from "react";
import "../styles/InfoPanels.scss";

export default function InfoPanels() {
  return (
    <div>
      <div className="info-panel">
        This is a clone of Reddit cretaed as a personal project and not intended to replace it in any way.
      </div>
      <div className="info-panel tools-used">
        Built Using: <p>React.js</p>
        <p>Firebase</p>
        <p>TypeScript</p>
        <p>Sass</p>
        <p>React-Router</p>
        <p>Date-fns</p>
        <p>Material-UI</p> <p>React-Icons</p>
      </div>
    </div>
  );
}
