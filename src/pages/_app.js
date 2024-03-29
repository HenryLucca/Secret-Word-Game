// css
import "../styles/globals.css"

// hooks
import {useCallback, useEffect, useState} from "react";

// components
import StartScreen from '../components/StartScreen';
import Game from '../components/Game';
import GameOver from '../components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const guessesQty = 5; 

const wordsList = [];

export function App() {

  // GameStages and WordList
  const [gameStage, setGameStage] = useState(stages[0].name);

  // Game info
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    fetch("/api/words")
    .then((response) => response.json())
    .then((data) => wordsList.push(...data));
  }, []);
  
  const pickWordAndCategory = useCallback(() => {

    // Randomize Category
    const category = wordsList[Math.floor(Math.random() * wordsList.length)].category;
    
    //Randomize Word
    const categoryWords = wordsList.filter((word) => word.category === category);
    const word = categoryWords[0].words[Math.floor(Math.random() * categoryWords[0].words.length)];
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    return{word, category};
  },[] );

  // starts the Secret Word game
  const startGame = useCallback(() => {
    //Clear Letters
    clearLetterStates();

    // pick word and pick category
    const {word, category} = pickWordAndCategory();

    //Create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  // restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }

  // Verify Guesses QTD
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }

  }, [guesses]);

  //Win Condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      
      // add score
      setScore((actualScore) => (actualScore += 100));
      // add bonus guesses, max 10
      setGuesses((actualGuesses) => {
        if (actualGuesses < 10 && actualGuesses+5 <= 10) {
          return actualGuesses + 5;
        }
        return 10;
      });

      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // handle name change
  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  }
  
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} handleNameChange={handleNameChange}/>}
      {gameStage === "game" && 
      <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === "end" && <GameOver playerName={playerName} retry={retry} score={score} pickedWord={pickedWord}/>}
    </div>
  );
}

export default App;
