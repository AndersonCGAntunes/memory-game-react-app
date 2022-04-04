import React from "react";
import classes from "./CardItem.module.css";

const CardItem = ({ card, selection, flipped, disabled }) => {
  const handleSelection = () => {
    if (!disabled) {
      selection(card);
    }
  };

  return (
    <div className={classes.card}>
      <div className={flipped ? classes.flipped : ""}>
        <img className={classes.front} src={card.src} alt="card front" />
        <img
          className={classes.back}
          src="/img/cover.png"
          alt="card back"
          onClick={handleSelection}
        />
      </div>
    </div>
  );
};

export default CardItem;
