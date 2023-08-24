import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { buildDecks, checkBust, delay, drawCard, handTotal } from '../functions/pureFunctions'
import PlayerHandTotal from '../components/PlayerHandTotal'
import { Link } from 'react-router-dom'

const StrategyTraining = () => {
  const actions = {
    standBy: 'standBy',
    dealPlayer: 'dealPlayer',
    dealDealer: 'dealDealer',
    hit: 'hit',
    stand: 'stand',
    split: 'split',
    double: 'double',
    insurance: 'insurance',
    surrender: 'surrender',
    bust: 'bust',
    dealerTurn: 'dealerTurn',
  }

  const testDeck = Array.from({ length: 20 }, (_, index) => {
    return {
      value: 5,
      name: '5',
      suit: 'Hearts',
    }
  })

  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState(testDeck)
  const [disableButtons, setDisableButtons] = useState(false)
  const [playerHandTotal, setPlayerHandTotal] = useState(handTotal(playerCards))
  const [dealerHandTotal, setDealerHandTotal] = useState(handTotal(dealerCards))
  const [action, setAction] = useState(actions.dealPlayer)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(true)

  const dealPlayerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
    // Check if new card caused a bust
    if (checkBust([...playerCards, card])) {
      setAction(actions.dealerTurn)
      // Check if new card gave Blackjack
    } else if (handTotal([...playerCards, card]) === 21) {
      setAction(actions.dealerTurn)
      console.log('BlackJack')
    } else {
      setAction(actions.standBy)
    }
  }
  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
    setDealerHandTotal(handTotal([...dealerCards, card]))
  }

  const handleHit = () => {
    setAction(actions.hit)
  }
  const handleSplit = () => {
    setAction(actions.split)
  }

  const handleStand = () => {
    setAction(actions.stand)
  }

  const handleDouble = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerCards((prevItem) => [...prevItem, { ...card, double: true }])
    setDeckOfCards([...updatedDeckOfCards])
    setAction(actions.double)
  }

  const handleReset = () => {
    setPlayerCards([])
    setDealerCards([])
    setDeckOfCards(testDeck)
    setDealCardFaceDown(true)
    setDisableButtons(false)
    setAction(actions.dealPlayer)
  }

  const nextRound = () => {
    setPlayerCards([])
    setDealerCards([])
    setDealCardFaceDown(true)
    setAction(actions.dealPlayer)
  }

  const dealerDraw = () => {
    setDealCardFaceDown(false)
    setTimeout(() => {
      if (handTotal(dealerCards) < 17) {
        dealDealerCard()
      }
    }, 1000)
  }

  useEffect(() => {
    if (action === actions.dealPlayer) {
      dealPlayerCard()
      setAction(actions.dealDealer)
    } else if (action === actions.dealDealer) {
      dealDealerCard()
      if (dealerCards.length < 1) {
        setAction(actions.dealPlayer)
      }
    } else if (action === actions.hit) {
      dealPlayerCard()
    } else if (action === actions.double) {
      setTimeout(() => {
        setAction(actions.dealerTurn)
      }, 400)
    } else if (action === actions.stand) {
      setAction(actions.dealerTurn)
    } else if (action === actions.split) {
      const updatedPlayerCards = playerCards.map((card) => ({
        ...card,
        split: true,
      }))
      setPlayerCards(updatedPlayerCards)
    } else if (action === actions.dealerTurn) {
      dealerDraw()
      if (dealerHandTotal < 17) {
        console.log(dealerHandTotal)
      }
      setDisableButtons(true)
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    } else if (action === actions.insurance) {
      setAction(actions.insurance)
    }
    setPlayerHandTotal(handTotal(playerCards))
    setDealerHandTotal(handTotal(dealerCards))
  }, [action])

  console.log(action)

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
      <PlayerCards cards={playerCards} action={action} />
      <PlayerHandTotal total={playerHandTotal} />

      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={handleHit} label={'Hit'} disabled={disableButtons} />

          <Button onClick={handleSplit} label={'Split'} disabled={disableButtons} />

          <Button onClick={handleDouble} label={'Double'} disabled={disableButtons} />

          <Button onClick={handleStand} label={'Stand'} disabled={disableButtons} />

          <Button label={'Insurance'} />

          <Button onClick={() => {}} label={'Surrender'} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Link to="/">
            <Button label={'Quit'} />
          </Link>
          <Button onClick={handleReset} label={'Reset'} />
        </div>
      </div>
    </div>
  )
}
export default StrategyTraining
