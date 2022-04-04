import { useState, useEffect } from "react";
import classes from "./App.module.css";
import CardItem from "./components/CardItem/CardItem";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const resetCards = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const selectedCardHandler = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCards();
      } else if (choiceOne.src !== choiceTwo.src) {
        setTimeout(() => resetCards(), 900);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={classes.App}>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className={classes["card-grid"]}>
        {cards.map((card) => (
          <CardItem
            card={card}
            key={card.id}
            selection={selectedCardHandler}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
