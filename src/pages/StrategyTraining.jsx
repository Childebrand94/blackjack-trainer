import { useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { buildDecks, dealCard } from '../functions/pureFunctions'

const StrategyTraining = () => {
  // const [playerCards, setPlayerCards] = useState([])
  // const [dealerCards, setDealerCards] = useState([])
  // const [deckOfCards, setDeckOfCards] = useState([])

  const playerCards = []
  const dealerCards = []
  const dealCardFaceDown = true
  const deckOfCards = buildDecks(6)

  const dealStartingCards = (deckOfCards) => {
    // base case if player and dealer both have 2 cards
    if (playerCards.length === 2 && dealerCards.length === 2) {
      return
    }
    // deal a card to the player or dealer
    const [card, newDeckOfCards] = dealCard(deckOfCards)
    if (playerCards.length <= dealerCards.length) {
      playerCards.push(card)
    } else {
      dealerCards.push(card)
    }
    //recursive call with 1 card less from original deck
    dealStartingCards(newDeckOfCards)
  }

  const round = (deckOfCards) => {
    dealStartingCards(deckOfCards)
  }

  round(deckOfCards)

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
