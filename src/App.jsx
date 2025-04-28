import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const [rollCounter, setRollCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      setIsRunning(false);
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setIsRunning(true);

      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );

      setRollCounter((prevRoll) => prevRoll + 1);
    } else {
      setTime(0);
      setDice(generateAllNewDice());
      setRollCounter(0);
    }
  }

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  function hold(id) {
    if (gameWon) return;
    else if (time === 0) {
      console.log("Roll for the first time before selecting");
      // Check if this warning has been shown before

      // Create tooltip element
      const button = document.getElementById(id);
      const tooltip = document.createElement("div");

      // Style the tooltip
      tooltip.textContent = "Roll the dice first before freezing!";
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "#879a00";
      tooltip.style.color = "white";
      tooltip.style.padding = "8px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "14px";
      tooltip.style.zIndex = "1000";
      tooltip.style.top = `${button.offsetTop - tooltip.offsetHeight - 10}px`;
      tooltip.style.left = `${
        button.offsetLeft + button.offsetWidth / 2 - 100
      }px`;
      // Add tooltip to document
      document.body.appendChild(tooltip);

      // Remove tooltip after 3 seconds
      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 1500);

      // Mark that we've shown this warning

      return;
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        )
      );
    }
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
      id={dieObj.id}
    />
  ));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main>
      {gameWon && (
        <Confetti
          width={windowWidth}
          numberOfPieces={500}
          gravity={4}
          initialVelocityY={200}
          friction={0.9}
        />
      )}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="timer">{formatTime()}</div>

      <div className="dice-container">{diceElements}</div>
      <p id="roll-count">Roll Count: {rollCounter}</p>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
