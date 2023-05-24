import styles from "./StartScreen.module.css";
import {useState} from "react";

const StartScreen = ({startGame, handleNameChange}) => {

  const [disabled, setDisabled] = useState(true);

  const nameChange = (event) => {
    handleNameChange(event);

    if (checkValidName(event.target.value)) {
      setDisabled(false);
      document.querySelector("button").style.cursor = "pointer";
    }
    else {
      setDisabled(true);
      document.querySelector("button").style.cursor = "not-allowed";
    }
  }

  function checkValidName(playerName){
    // name must be 3-10 characters long, only letters and numbers allowed
    const regex = /^[a-zA-Z0-9]{3,10}$/;
    return regex.test(playerName);
  }
    
  return (
    <div className={styles.start}>
        <h1>Secret Word Game</h1>
        <p>Insira seu nome e clique no botão abaixo para começar a jogar</p>
        <input type="text" placeholder="Digite seu nome" onChange={nameChange}/>
        <button className="" onClick={startGame} disabled={disabled}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen