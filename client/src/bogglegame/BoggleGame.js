import React, { Component } from 'react';
import './style.css'; // Make sure to import your CSS file

class BoggleGame extends Component {
  // You can define your component logic here
  
  render() {
    return (
      <div>
        <section className="right-words-container">
          <div className="words">
            <span>Right Words</span>
            <ul id="right-list">
              {/* You can render right words dynamically here */}
            </ul>
          </div>
        </section>

        <section className="board-container">
          <div className="clock-container">
            <div id="clockdiv">
              <div>
                <span className="minutes">00</span>
                <div className="smalltext">Minutes</div>
              </div>
              <div>
                <span className="seconds">00</span>
                <div className="smalltext">Seconds</div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div style={{ display: 'table', margin: '0 auto' }}>
            <span id='start-game' className='btn-primary'>Start Game</span>
            <span id='reset-turn' className='btn-secondary'>Reset</span>

            <div id='points' className='total'>0 Point(s)</div>
            <div id="board">
              {/* You can render the game board here */}
            </div>

            <input id='entered' className="word" type='text' placeholder="type and press return..." />
            <span id='add-word' className='btn-primary'>Add Word</span>
          </div>
          <div id="error-msg"></div>
        </section>

        <section className="wrong-words-container">
          <div className="words">
            <span>Wrong Words</span>
            <ul id="wrong-list">
              {/* You can render wrong words dynamically here */}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default BoggleGame;
