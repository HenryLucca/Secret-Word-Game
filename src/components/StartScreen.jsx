import styles from "./StartScreen.module.css";
import { useState } from "react";

const StartScreen = ({ startGame, handleNameChange }) => {
  const [disabled, setDisabled] = useState(true);

  const nameChange = (event) => {
    handleNameChange(event);

    if (checkValidName(event.target.value)) {
      setDisabled(false);
      document.querySelector("button").style.cursor = "pointer";
    } else {
      setDisabled(true);
      document.querySelector("button").style.cursor = "not-allowed";
    }
  };

  function checkValidName(playerName) {
    // name must be 3-10 characters long, only letters,numbers and emojis allowed
    const regex = new RegExp("^[a-zA-Z0-9\u00C0-\u00FF ]{3,10}$");
    // emoji regex
    const regex2 = new RegExp(
      "\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]"
    );
    // surrogate pair regex
    const regex3 = new RegExp(regex.source + "|" + regex2.source);
    return regex3.test(playerName);
  }

  return (
    <div className={styles.start}>

      <div className="container">
        <h1>Secret Word Game</h1>
      </div>

      <div className="container">
        <p>Insira seu nome e clique no botão abaixo para começar a jogar</p>
      </div>

      <div className={`container $(styles.entergame)`}>

        <input
          className={styles.mainInput}
          type="text"
          placeholder="Digite seu nome"
          onChange={nameChange}
        />

        <button onClick={startGame} disabled={disabled}>
          Começar o jogo
        </button>
        
      </div>
    </div>
  );
};

export default StartScreen;
