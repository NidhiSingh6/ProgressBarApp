import React, { useState } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleIncrement = () => {
    if (num < 150) {
      setHistory([...history, num]);
      setRedoStack([]);
      setNum(num + 1);
    }
  };

  const handleDecrement = () => {
    if (num > 0) {
      setHistory([...history, num]);
      setRedoStack([]);
      setNum(num - 1);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastValue = history[history.length - 1];
      setRedoStack([num, ...redoStack]);
      setHistory(history.slice(0, -1));
      setNum(lastValue);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextValue = redoStack[0];
      setHistory([...history, num]);
      setRedoStack(redoStack.slice(1));
      setNum(nextValue);
    }
  };

  return (
    <div className="App">
      <h1>React Progress Bar with Undo/Redo</h1>
      <div className="controls">
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <div className="controls">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <ProgressBar value={num} />
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${(value / 150) * 100}%` }}
      />
    </div>
  );
}

export default App;
