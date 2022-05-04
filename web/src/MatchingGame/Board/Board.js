import { LocalFireDepartment } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SingleCard from "../SingleCard/SingleCard";
import "./Board.css"

export default function Board() {
  const [deck, setDeck] = useState([])
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const suites = [{ value: "♠️", matched: false }, { value: "♦️", matched: false }, { value: "♥️", matched: false }, { value: "♣️", matched: false }, { value: "🃏", matched: false }, { value: "🗿", matched: false }, { value: "♠️", matched: false }, { value: "♦️", matched: false }, { value: "♥️", matched: false }, { value: "♣️", matched: false }, { value: "🃏", matched: false }, { value: "🗿", matched: false }]

  function clickReveal(card) {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  function reset() {
    setCardOne(null)
    setCardTwo(null)
    setDisabled(false)
  }

  function shuffle() {
    let shuffledSuites = suites.sort(() => Math.random() - .5)
    shuffledSuites.map((card, index) => {
      card.index = index
    })
    setDeck(shuffledSuites)
  }


  useEffect(() => {
    if (deck.length === 0) {
      shuffle()
    }
  }, [deck])

  function checkWinState(){
    if(!deck.some((card) => card.matched == false)){
      return(
        <div>
          <div>Congratulations</div>
          <button onClick={shuffle}>Rematch</button>
        </div>
      )
    }
  }

  function evaluateCards() {
    if (cardOne.value === cardTwo.value) {
      setDeck(prevCards => {
        return prevCards.map(card => {
          if (card.value === cardOne.value) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })
      reset()
    } else {
      reset()
    }
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true)
      setTimeout(() => evaluateCards(), 2000)
    }
  }, [cardOne, cardTwo])


  return (
    <div>
      <div className="grid">
        {deck.map((card, index) => (
          <SingleCard
            key={index}
            card={card}
            clickReveal={clickReveal}
            disabled={disabled}
            flipped={card === cardOne || card === cardTwo}
          />
        ))}
      </div>
      {checkWinState()}
    </div>
  )
}
