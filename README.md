# Tenzies Game 🎲

This is a simple web-based version of the game **Tenzies**, built with React.

## How to Play
- Roll the dice and try to freeze all the dice to show the same number.
- You can click on any die to "freeze" it.
- Keep rolling until all dice are frozen with the same number.
- The faster you match all dice, the better!

## Features
- **State Management**: Used `useState` to handle dice values, frozen status, timer, and overall game state.
- **Side Effects**: Used `useEffect` for:
  - Managing the game timer
  - Checking if the player has won
  - Handling screen width for responsive behavior
- **Refs**: Used `useRef` to automatically set focus on the "New Game" button when the game ends.
- **Props**: Passed props between components for clean organization and easier control over behavior.
- **Conditional Rendering**: Updated the UI based on different game states (e.g., ongoing game vs. game won).
- **Accessibility**: Added `aria-labels` and `aria-live` to make the game more accessible to screen readers.

## Demo
You can play the game here: [[Netlify Link](https://tenzies-react-page.netlify.app/)]
