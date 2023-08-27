import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { buildDecks, checkBust, delay, drawCard, handTotal } from '../functions/pureFunctions'
import PlayerHandTotal from '../components/PlayerHandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

const StrategyTraining = () => {
  const actions = {
    standBy: 'standBy',
    dealPlayer: 'dealPlayer',
    dealDealer: 'dealDealer',
    hit: 'hit',
    split: 'split',
    double: 'double',
    insurance: 'insurance',
    surrender: 'surrender',
    checkBust: 'checkBust',
    dealerTurn: 'dealerTurn',
    dealerTotalCheck: 'dealerTotalCheck',
  }

  const testDeck = Array.from({ length: 20 }, (_, index) => {
    return {
      value: 2,
      name: '2',
      suit: 'Hearts',
    }
  })

  const [playerCards, setPlayerCards] = useState([{ cards: [], finished: false }])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState(testDeck)
  const [disableButtons, setDisableButtons] = useState(false)
  const [playerHandTotal, setPlayerHandTotal] = useState(playerCards[0].cards)
  const [action, setAction] = useState(actions.dealPlayer)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(true)

  const dealPlayerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerCards((prevHands) => {
      const targetHandIndex = prevHands.findIndex((hand) => !hand.finished)
      if (targetHandIndex === -1) {
        return prevHands
      }
      return prevHands.map((hand, index) => {
        if (index === targetHandIndex) {
          return {
            ...hand,
            cards: [...hand.cards, card],
          }
        }
        return hand
      })
    })
    setDeckOfCards([...updatedDeckOfCards])
  }

  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
  }

  const splitPlayerHand = () => {}

  const handleHit = () => {
    setAction(actions.hit)
  }
  const handleSplit = () => {
    setAction(actions.split)
  }

  const handleStand = () => {
    setAction(actions.dealerTurn)
  }

  const handleDouble = () => {
    setAction(actions.double)
  }

  const handleReset = () => {
    setPlayerCards([{ cards: [], finished: false }])
    setDealerCards([])
    setDeckOfCards(testDeck)
    setDealCardFaceDown(true)
    setDisableButtons(false)
    setAction(actions.dealPlayer)
  }

  const nextRound = () => {
    setPlayerCards([{ cards: [], finished: false }])
    setDealerCards([])
    setDealCardFaceDown(true)
    setAction(actions.dealPlayer)
  }

  useEffect(() => {
    console.log(action)
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
      setAction(actions.checkBust)
    } else if (action === actions.checkBust) {
      setPlayerCards((prevItem) => {
        return prevItem.map((hand) => {
          return {
            ...hand,
            finished: checkBust(hand.cards) ? true : false,
          }
        })
      })

      if (checkBust(playerCards[0].cards)) {
        setAction(actions.dealerTurn)
        // Check if new card gave Blackjack
      } else if (handTotal(playerCards[0].cards) === 21) {
        setAction(actions.dealerTurn)
      } else {
        setAction(actions.standBy)
      }
    } else if (action === actions.double) {
      const [card, updatedDeckOfCards] = drawCard(deckOfCards)
      setPlayerCards((prevItem) => {
        return prevItem.map((hand) => {
          return {
            ...hand,
            cards: [...hand.cards, { ...card, double: true }],
          }
        })
      })
      setDeckOfCards([...updatedDeckOfCards])
      setTimeout(() => {
        setAction(actions.dealerTurn)
      }, 400)
    } else if (action === actions.split) {
      setPlayerCards((prevItem) => {
        return prevItem.flatMap((hand) => {
          return hand.cards.map((card) => {
            return { ...hand, cards: [card] }
          })
        })
      })
    } else if (action === actions.dealerTurn) {
      setDealCardFaceDown(false)
      setDisableButtons(true)
      setTimeout(() => {
        dealDealerCard()
        setAction(actions.dealerTotalCheck)
      }, 1000)
    } else if (action === actions.dealerTotalCheck) {
      if (handTotal(dealerCards) < 17) {
        console.log(handTotal(dealerCards))
        setAction(actions.dealerTurn)
      } else {
        console.log('End')
      }
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    } else if (action === actions.insurance) {
      setAction(actions.insurance)
    }
    setPlayerHandTotal(handTotal(playerCards[0].cards))
  }, [action])

  console.log(playerCards)
  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
      <div className="col-start-2 row-start-2 flex space-x-10">
        {playerCards.map((hand) => {
          return <PlayerCards key={nanoid()} cards={hand.cards} action={action} />
        })}
      </div>
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
