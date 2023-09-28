import React, { Component } from 'react';
import './WordScrambleGame.css'; 
import words from './data';

export class WordScrambleGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      currentWord: null,
      scrambledWord: '',
      inputWord: '',
      score: 0,
      remainingWords: 10,
      timer: 30,
      gameOver: false,
      hint: '',
      gameStarted: false,
    };

    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.setState({ words: this.shuffleArray([...words]) });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      } else {
        this.nextWord();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  startGame() {
    this.setState({ gameStarted: true }, () => {
      this.nextWord();
      this.startTimer();
    });
  }

  nextWord() {
    const { words, remainingWords } = this.state;

    if (remainingWords === 0) {
      this.stopTimer();
      this.setState({
        gameOver: true,
      });
      return;
    }

    const word = words.pop();
    const scrambledWord = this.shuffleArray([...word.word]).join('');

    this.setState({
      currentWord: word,
      scrambledWord,
      inputWord: '',
      remainingWords: remainingWords - 1,
      timer: 30,
      hint: word.hint,
    });
  }

  checkWord() {
    const { inputWord, currentWord, score } = this.state;

    if (inputWord.toLowerCase() === currentWord.word.toLowerCase()) {
      this.stopTimer();
      this.setState(
        {
          score: score + 1,
        },
        () => {
          this.nextWord();
          this.startTimer();
        }
      );
    } else {
      alert('Wrong answer! Try again.');
    }
  }

  render() {
    const {
      scrambledWord,
      inputWord,
      score,
      remainingWords,
      timer,
      gameOver,
      hint,
      gameStarted,
    } = this.state;

    return (
      <div className="container">
        <h2 className="center">Word Scramble Game</h2>
        {!gameStarted && !gameOver && (
          <div className="startArea">
            <button className="startBtn" onClick={() => this.startGame()}>
              Start Game
            </button>
          </div>
        )}
        {gameStarted && (
          <div className="content">
            <p>Scrambled Word: {scrambledWord}</p>
            <p>Hint: {hint}</p>
            <input
              type="text"
              value={inputWord}
              onChange={(e) => this.setState({ inputWord: e.target.value })}
            />
            <div className="buttons">
              <button className="sBtn" onClick={() => this.checkWord()}>
                Check
              </button>
            </div>
          </div>
        )}
        <p className="score-area">
          Score: <span className="score">{score}</span>
        </p>
        <p>Remaining Words: {remainingWords}</p>
        <p>Time Left: {timer} seconds</p>
        {gameOver && (
          <p className="center">
            Game Over! Your final score: <span className="score">{score}</span>
          </p>
        )}
      </div>
    );
  }
}

export default WordScrambleGame;
