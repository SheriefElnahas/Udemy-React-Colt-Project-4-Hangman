import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(letter => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let letter = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button key={letter}  value={letter}  onClick={this.handleGuess} disabled={this.state.guessed.has(letter)}  >
        {letter}
      </button>
    ));
  }

  restartGame() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  showResults() {
    if(this.guessedWord().join("") === this.state.answer) {
      return "You Won!";
    }
    if(this.state.nWrong < this.props.maxWrong) {
      return this.generateButtons();
    } 
  }


  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`}  />
        <p> {this.state.nWrong === this.props.maxWrong ? "Game Over": `Wrong Attempts : ${this.state.nWrong}`} </p>
        <p className='Hangman-word'>
        {this.state.nWrong < this.props.maxWrong  ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">
         {this.showResults()}
         {/* {this.state.nWrong < this.props.maxWrong  ? this.generateButtons()  : ""} */}
        </p>
          <div className="btn-container">
          <button className="btn-restart" onClick={this.restartGame}>
            Restart
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
