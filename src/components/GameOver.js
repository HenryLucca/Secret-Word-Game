import styles from './GameOver.module.css'
import {useState, useEffect} from 'react'

const GameOver = ({retry, score, playerName}) => {

  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    fetch("/api/highscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: playerName, score: score})
    })
    .then((response) => response.json())
    .then((data) => setTopScores(data) && setIsLoaded(true));
  }, []);

  return (
    <div>
      <h1>Fim de jogo! </h1>
      <h2 className={styles.endgame}>Parabéns, {playerName}!</h2>
      <h2 className={styles.endgame}>A sua pontuação foi: <span>{score}</span> </h2>

      <h2 className={styles.endgame}>Top pontuações:</h2>

      {topScores.map((topScore) => (
        <li key={topScore.id}>Nome: <span>{ topScore.name} </span> Pontuação: <span>{ topScore.score} </span></li>
      ))} 

      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver;