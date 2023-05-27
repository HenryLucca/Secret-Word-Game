import { useState, useRef } from "react";
import styles from "./Game.module.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className={styles.game}>

      <div className={styles.upper}>
        <div className={styles.upperLeft}>
          <div className={styles.pointsAndTries}>
            <div className={`${styles.gameContainer} ${styles.pointsContainer}`} >
              <p className={`${styles.points}`}>
                Pontos: <span className={styles.highlight}>{score}</span>
              </p>
            </div>
            <div className={styles.gameContainer}>
              <p className={styles.sidePadding}>Tentativas restantes : <span className={styles.highlight}>{guesses}</span> </p>
            </div>
          </div>

          <div className={styles.gameContainer}>
            <h1 className={`${styles.sidePadding} ${styles.guessTheWord}`}>Advinhe a palavra :</h1>
          </div>
        </div>

        <div className={styles.gameContainer}>
          <h3>
            Dica sobre a palavra :
          </h3>
          <p className={styles.tip}>
            <span className={styles.highlight}>{pickedCategory}</span>
          </p>
        </div>
      </div>

      <div className={styles.middle}>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className={styles.letter} key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}></span>
          )
        )}
      </div>
      </div>


      <div className={styles.lower}>

        <div className={styles.gameContainer}>
          <div className={styles.letterContainer}>
            <p>Tente adivnhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="letter"
                maxLength="1"
                onChange={(e) => setLetter(e.target.value)}
                required
                value={letter}
                ref={letterInputRef}
              />
              <button>Jogar!</button>
            </form>
          </div>
        </div>

        <div className={styles.gameContainer}>

          <div className={styles.wrongLetters}>
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i) => (
              wrongLetters.length - 1 === i ? (
                <span key={i} className={styles.highlight}>{letter}</span>
              ) : (
                <span key={i}> <span className={styles.highlight}>{letter}</span> - </span>
              )
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Game;