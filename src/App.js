import React, { useState } from "react";
import "./App.css";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

const App = () => {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [selectedCommand, setSelectedCommand] = useState("");
  const [placeX, setPlaceX] = useState("");
  const [placeY, setPlaceY] = useState("");
  const [placeFacing, setPlaceFacing] = useState("");

  const placeRobot = (x, y, facing) => {
    if (x >= 1 && x <= 5 && y >= 1 && y <= 5 && DIRECTIONS.includes(facing)) {
      setPosition({ x, y, facing });
    }
  };

  const moveRobot = () => {
    const { x, y, facing } = position;
    let newX = x;
    let newY = y;
    switch (facing) {
      case "NORTH":
        newY = Math.min(y + 1, 5); 
        break;
      case "EAST":
        newX = Math.min(x + 1, 5); // Limit to grid boundary
        break;
      case "SOUTH":
        newY = Math.max(y - 1, 1); // Limit to grid boundary
        break;
      case "WEST":
        newX = Math.max(x - 1, 1); // Limit to grid boundary
        break;
      default:
        break;
    }
    placeRobot(newX, newY, facing);
  };

  const rotateRobot = (direction) => {
    console.log(position);
    const { x, y, facing } = position;
    let newX = x;
    if (direction === "LEFT") {
      newX = Math.max(x - 1, 1);
    } else {
      newX = Math.min(x + 1, 5);
    }
    setPosition({ x: newX, y, facing });
  };

  const reportPosition = () => {
    const { x, y, facing } = position;
    if (x !== null && y !== null && facing !== null) {
      alert(`Current position: ${x},${y},${facing}`);
    }
  };

  const handleCommand = () => {
    switch (selectedCommand) {
      case "PLACE":
        placeRobot(parseInt(placeX), parseInt(placeY), placeFacing);
        break;
      case "MOVE":
        moveRobot();
        break;
      case "LEFT":
        rotateRobot("LEFT");
        break;
      case "RIGHT":
        rotateRobot("RIGHT");
        break;
      case "REPORT":
        reportPosition();
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Toy Robot Simulation</h1>
      <div className="robot-container">
        <div
          className={`robot ${
            position && position.x !== null ? "visible" : ""
          }`}
          style={{
            left: position ? (position.x - 1) * 50 + "px" : "0", // Adjusting for 1-based index
            bottom: position ? (position.y - 1) * 50 + "px" : "0", // Adjusting for 1-based index
            transform: position
              ? `rotate(${DIRECTIONS.indexOf(position.facing) * 90}deg)`
              : "rotate(0deg)",
          }}
        ></div>
      </div>
      <select
        value={selectedCommand}
        onChange={(e) => setSelectedCommand(e.target.value)}
      >
        <option value="">Select Command</option>
        <option value="PLACE">PLACE</option>
        <option value="MOVE">MOVE</option>
        <option value="LEFT">LEFT</option>
        <option value="RIGHT">RIGHT</option>
        <option value="REPORT">REPORT</option>
      </select>
      {selectedCommand === "PLACE" && (
        <div>
          <input
            type="number"
            placeholder="X (1-5)"
            min="1"
            max="5"
            value={placeX}
            onChange={(e) => setPlaceX(e.target.value)}
          />
          <input
            type="number"
            placeholder="Y (1-5)"
            min="1"
            max="5"
            value={placeY}
            onChange={(e) => setPlaceY(e.target.value)}
          />
          <select
            value={placeFacing}
            onChange={(e) => setPlaceFacing(e.target.value)}
          >
            <option value="">Select Facing</option>
            {DIRECTIONS.map((dir) => (
              <option key={dir} value={dir}>
                {dir}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleCommand}>Execute</button>
    </div>
  );
};

export default App;