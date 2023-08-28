import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
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
    stand: 'stand',
    double: 'double',
    insurance: 'insurance',
    surrender: 'surrender',
    checkBust: 'checkBust',
    checkPlayerFinished: 'checkPlayerFinished',
    dealerTurn: 'dealerTurn',
    dealerTotalCheck: 'dealerTotalCheck',
    setActiveHand: 'setActiveHand',
  }

  const testDeck = Array.from({ length: 50 }, (_, index) => {
    return {
      value: 2,
      name: '2',
      suit: 'Hearts',
    }
  })

  const [playerHands, setPlayerHands] = useState([{ cards: [], finished: false, active: true }])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState(testDeck)
  const [disableButtons, setDisableButtons] = useState(false)
  const [playerHandTotal, setPlayerHandTotal] = useState(playerHands[0].cards)
  const [action, setAction] = useState(actions.dealPlayer)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(true)
  const [activeHandIndex, setActiveHandIndex] = useState(0)

  const dealPlayerCard = (handIndex = null) => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerHands((prevHands) => {
      //incase of split, only deal card to the first hand that is not finished
      const targetHandIndex = prevHands.findIndex((hand) => !hand.finished)
      if (targetHandIndex === -1) {
        return prevHands
      }
      if (!handIndex) {
        return prevHands.map((hand, index) => {
          if (index === targetHandIndex) {
            return {
              ...hand,
              cards: [...hand.cards, card],
            }
          }
          return hand
        })
      } else {
        return prevHands.map((hand, index) => {
          if (index === handIndex) {
            return {
              ...hand,
              cards: [...hand.cards, card],
            }
          }
          return hand
        })
      }
    })
    setDeckOfCards([...updatedDeckOfCards])
  }

  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
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
    setAction(actions.double)
  }

  const handleReset = () => {
    setPlayerHands([{ cards: [], finished: false, active: true }])
    setDealerCards([])
    setDeckOfCards(testDeck)
    setDealCardFaceDown(true)
    setDisableButtons(false)
    setAction(actions.dealPlayer)
  }

  const nextRound = () => {
    setPlayerHands([{ cards: [], finished: false }])
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
    } else if (action === actions.stand) {
      setPlayerHands((prevItem) => {
        const handIndex = prevItem.findIndex((hand) => !hand.finished)
        return prevItem.map((hand, index) => {
          if (index === handIndex) {
            return {
              ...hand,
              finished: true,
            }
          }
          return { ...hand }
        })
      })
      setAction(actions.checkPlayerFinished)
    } else if (action === actions.hit) {
      dealPlayerCard()
      setAction(actions.checkBust)
    } else if (action === actions.checkBust) {
      setPlayerHands((prevItem) => {
        return prevItem.map((hand) => {
          if (!hand.finished) {
            return {
              ...hand,
              finished: checkBust(hand.cards) || handTotal(hand.cars) === 21 ? true : false,
            }
          } else return { ...hand }
        })
      })
      setAction(actions.checkPlayerFinished)
    } else if (action === actions.double) {
      const [card, updatedDeckOfCards] = drawCard(deckOfCards)
      setPlayerHands((prevItem) => {
        const handIndex = prevItem.findIndex((hand) => !hand.finished)
        return prevItem.map((hand, index) => {
          if (index === handIndex) {
            return {
              ...hand,
              cards: [...hand.cards, { ...card, double: true }],
              finished: true,
            }
          } else return { ...hand }
        })
      })
      setDeckOfCards([...updatedDeckOfCards])

      setAction(actions.checkPlayerFinished)
    } else if (action === actions.split) {
      setPlayerHands((prevItem) => {
        return prevItem.flatMap((hand) => {
          if (hand.active) {
            return hand.cards.map((card, index) => {
              if (index === hand.cards.length - 1) {
                return { ...hand, cards: [card], active: false }
              } else {
                return { ...hand, cards: [card] }
              }
            })
          } else return { ...hand }
        })
      })
      playerHands.forEach((_, index) => {
        setTimeout(() => {
          dealPlayerCard(index)
        }, 300)
      })

      setAction(actions.standBy)
    } else if (action === actions.setActiveHand) {
    } else if (action === actions.checkPlayerFinished) {
      const allPlayerHandsFinished = playerHands.every((hand) => hand.finished)
      if (allPlayerHandsFinished) {
        setAction(actions.dealerTurn)
      } else {
        setAction(actions.standBy)
      }
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
    setPlayerHandTotal(handTotal(playerHands[0].cards))
  }, [action])

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
      <div className="col-start-2 row-start-2 flex space-x-10">
        {playerHands.map((hand) => {
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
