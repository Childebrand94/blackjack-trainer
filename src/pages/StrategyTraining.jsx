import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { buildDecks, dealCard, dealOrder } from '../functions/pureFunctions'

const StrategyTraining = () => {
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState([])
  const dealCardFaceDown = true

  // const playerCards = []
  // const dealerCards = []

  const deck = buildDecks(1)
  // setDeckOfCards((prevItem) => [...prevItem, ...deck])
  // console.log(deckOfCards)

  const dealStartingCards = (deck, playerCards, dealerCards) => {
    // base case if player and dealer both have 2 cards
    if (playerCards.length === 2 && dealerCards.length === 2) {
      return [playerCards, dealerCards]
    }
    // get a random object from deck return object and deck minus that object
    const [card, newDeckOfCards] = dealCard(deck)
    // adding cards objects to player and dealer array in player then dealer order
    const [updatedPlayerCards, updatedDealerCards] = dealOrder(playerCards, dealerCards, card)

    // Recursive call with 1 card less from original deck
    return dealStartingCards(newDeckOfCards, updatedPlayerCards, updatedDealerCards)
  }

  // Call the recursive function and store the starting hands
  const [startingPlayerHand, startingDealerHand] = dealStartingCards(deck, playerCards, dealerCards)

  console.log(startingDealerHand)
  console.log(startingPlayerHand)
  console.log(deck.length)

  setDealerCards((prevItem) => [...prevItem, ...startingDealerHand])
  setPlayerCards((prevItem) => [...prevItem, ...startingPlayerHand])

  const onClick = () => {
    console.log('Click')
  }

  const handleHit = () => {
    playerCards.push()
  }

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
      <PlayerCards cards={playerCards} />

      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={handleHit} label={'Hit'} />

          <Button onClick={onClick} label={'Split'} />

          <Button onClick={onClick} label={'Double'} />

          <Button onClick={onClick} label={'Stand'} />

          <Button onClick={onClick} label={'Insurance'} />

          <Button onClick={onClick} label={'Surrender'} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Button onClick={onClick} label={'Quit'} />

          <Button onClick={onClick} label={'Reset'} />
        </div>
      </div>
    </div>
  )
}
export default StrategyTraining
