import styles from './GameOver.module.css'
import { useState, useEffect } from 'react'

const GameOver = ({ retry, score, playerName, pickedWord }) => {

  const [topScores, setTopScores] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/highscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName, score: score })
    })
      .then((response) => response.json())
      .then((data) => {
        setTopScores(data); 
        setIsLoaded(true);
        topScores.sort((a, b) => b.score - a.score);
      });
  }, []);


  return (
    <div className={styles.gameOver}>
      <div className='container'>
        <h1>Fim de jogo ! </h1>
        <p>A palavra era <span className={`${styles.highlight} ${styles.underline}`}>{pickedWord}</span></p>
      </div>
      <div className={styles.gameOverContainer}>
        <h2 className={styles.endgame}>Parabéns, <span className={styles.highlight}>{playerName}</span>!</h2>
        <h2 className={styles.endgame}>Você conseguiu <span className={styles.highlight}>{score}</span> pontos!</h2>
      </div>


      <div className={styles.leaderboard}>
        <div className={styles.leaderboardHeader}>
          <h2 className={styles.endgame}>Top pontuadores:</h2>
        </div>
        
        { !isLoaded &&
          <div className={styles.loading}>
            <h2 className={styles.endgame}>Carregando...</h2>
            <div className={styles.loader}></div>
          </div>
        }

        <table className={styles.leaderboardTable}>
          {topScores.map((topScore, i) => (
            i === 0 ?
              <tr key={i}>
                <td className={`${styles.highlight} ${styles.position}`}>👑  </td>
                <td className={styles.name}><span className={`${styles.highlight} ${styles.firstHighlight}`}>{topScore.name}</span> </td>
                <td className={styles.points}>Pontos:  <span className={styles.highlight}>{topScore.score}</span> </td>
              </tr>
              :
              i === 1 ?
                <tr key={i}>
                  <td className={`${styles.highlight} ${styles.position}`}>🥈  </td>
                  <td className={styles.name}><span className={styles.highlight}>{topScore.name}</span> </td>
                  <td className={styles.points}>Pontos:  <span className={styles.highlight}>{topScore.score}</span> </td>
                </tr>
                :
                i === 2 ?
                  <tr key={i}>
                    <td className={`${styles.highlight} ${styles.position}`}>🥉  </td>
                    <td className={styles.name}><span className={styles.highlight}>{topScore.name}</span> </td>
                    <td className={styles.points}>Pontos:  <span className={styles.highlight}>{topScore.score}</span> </td>
                  </tr>
                  :
                  <tr key={i}>
                    <td className={`${styles.highlight} ${styles.position}`}>{i + 1}º  </td>
                    <td className={styles.name}><span className={styles.highlight}>{topScore.name}</span> </td>
                    <td className={styles.points}>Pontos:  <span className={styles.highlight}>{topScore.score}</span> </td>
                  </tr>
          ))}
        </table>
      </div>

      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver;