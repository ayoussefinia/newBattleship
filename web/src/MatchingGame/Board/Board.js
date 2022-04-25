import React, { useState } from "react";
import SingleCard from "../SingleCard/SingleCard";
import "./Board.css"

export default function Board() {
  const [cards, setCards] = useState([])

  // This array will probably change or be added to, this is only temp
  let suites = ["♠️", "♣️", "♥️", "♦️", "🃏"]

  function shuffle(){
    let shuffledSuites = [...suites, ...suites].sort (() => Math.random() - .5)
    setCards(shuffledSuites)
  }

  // button is also only temp
  return (
    <div>
      <button onClick={shuffle}>New Game</button>
      <div className="grid">
      {cards.map(card => (
        <SingleCard
        card={card}
        />
      ))}
      </div>
    </div>
  )
}
