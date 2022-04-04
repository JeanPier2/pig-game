import { useState, useRef, useEffect } from 'react';
import './App.css';
import { images } from './constants';

const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

function App() {
  /* Selecting Elements */
  // Player 0
  const player0El = useRef(null);
  const score0El = useRef(null);
  const current0El = useRef(null);
  // Player 1
  const player1El = useRef(null);
  const score1El = useRef(null);
  const current1El = useRef(null);

  const diceEl = useRef(null);
  const btnNew = useRef(null);
  const btnRoll = useRef(null);
  const btnHold = useRef(null);

  useEffect(() => {
    score0El.current.textContent = 0;
    score1El.current.textContent = 0;
    diceEl.current.classList.add('hidden');
  }, []);

  const switchPlayer = () => {
    if (activePlayer === 0) {
      current0El.current.textContent = 0;
    } else {
      current1El.current.textContent = 0;
    }
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.current.classList.toggle('player--active');
    player1El.current.classList.toggle('player--active');
  };

  /* Rolling dice functionality */

  const btnRollClicked = () => {
    if (playing) {
      // 1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
      console.log(dice);
      // 2. Display dice
      diceEl.current.classList.remove('hidden');
      diceEl.current.src = images[`dice${dice}`];

      //3. Check for rolled 1: if true, switch to next player
      if (dice !== 1) {
        currentScore += dice;

        if (activePlayer === 0) {
          current0El.current.textContent = currentScore;
        } else {
          current1El.current.textContent = currentScore;
        }
      } else {
        switchPlayer();
      }
    }
  };

  const btnHoldClicked = () => {
    if (playing) {
      // 1. Add current score to active player's score
      scores[activePlayer] += currentScore;
      if (activePlayer === 0) {
        score0El.current.textContent = scores[activePlayer];
      } else {
        score1El.current.textContent = scores[activePlayer];
      }
      // 2. Check if player's score i >= 100
      // Finish game
      if (scores[activePlayer] >= 100) {
        playing = false;
        if (activePlayer === 0) {
          player0El.current.classList.add('player--winner');
          player0El.current.classList.remove('player--active');
        } else {
          player1El.current.classList.add('player--winner');
          player1El.current.classList.remove('player--active');
        }
        diceEl.current.classList.add('hidden');
      }
      // Switch to the next player
      switchPlayer();
    }
  };

  const btnNewGameClicked = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <main>
        <section ref={player0El} className="player player--0 player--active">
          <h2 className="name" id="name--0">
            Player 1
          </h2>
          <p ref={score0El} className="score" id="score--0">
            43
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p ref={current0El} className="current-score" id="current--0">
              0
            </p>
          </div>
        </section>
        <section ref={player1El} className="player player--1">
          <h2 className="name" id="name--1">
            Player 2
          </h2>
          <p ref={score1El} className="score" id="score--1">
            24
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p ref={current1El} className="current-score" id="current--1">
              0
            </p>
          </div>
        </section>

        <img
          src={images.dice4}
          alt="Playing dice"
          className="dice"
          ref={diceEl}
        />
        <button
          onClick={btnNewGameClicked}
          ref={btnNew}
          className="btn btn--new"
        >
          🔄 New game
        </button>
        <button
          onClick={btnRollClicked}
          ref={btnRoll}
          className="btn btn--roll"
        >
          🎲 Roll dice
        </button>
        <button
          onClick={btnHoldClicked}
          ref={btnHold}
          className="btn btn--hold"
        >
          📥 Hold
        </button>
      </main>
    </div>
  );
}

export default App;
