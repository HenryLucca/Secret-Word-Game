import styles from "./StartScreen.module.css";

const StartScreen = ({startGame}) => {

  const handleNameChange = (event) => {
    console.log(event.target.value);
  }
    
  return (
    <div className={styles.start}>
        <h1>Secret Word Game</h1>
        <p>Insira seu nome e clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen