import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
import {
  buildDecks,
  buildStackedDeck1,
  checkBust,
  drawCard,
  getHandType,
  handTotal,
  strategyCheck,
} from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import {} from '../functions/matrix'

const testing = true

const StrategyTraining = () => {
  const actions = {
    standBy: 'standBy',
    dealPlayer: 'dealPlayer',
    dealDealer: 'dealDealer',
    hit: 'hit',
    split: 'split',
    stand: 'stand',
    double: 'double',
    checkInsurance: 'checkInsurance',
    checkStrategy: 'checkStrategy',
    dealSplitHand: 'dealSplitHand',
    surrender: 'surrender',
    checkBust: 'checkBust',
    checkDealerTurn: 'checkDealerTurn',
    checkBlackjack: 'checkBlackjack',
    dealerTurn: 'dealerTurn',
    dealerTotalCheck: 'dealerTotalCheck',
    startNextRound: 'startNextRound',
    callPlayerAction: 'callPlayerAction',
  }

  const playerChoices = {
    stand: 'S',
    split: 'SP',
    hit: 'H',
    double: 'D',
  }

  const testDeck = Array.from({ length: 50 }, (_) => {
    return {
      value: 11,
      name: 'A',
      suit: 'Hearts',
    }
  })

  const initialPlayerHand = [[]]
  const initialDealerHand = []
  const initialDeck = buildDecks(6)
  const initialTestingDeck = buildStackedDeck1(100)
  const initialButton = false
  const initialAction = actions.dealPlayer
  const initialDealerCardFaceDown = true
  const initialPlayerHandIndex = 0
  const initialPlayerChoice = null
  const initialPauseState = false

  const [playerHands, setPlayerHands] = useState(initialPlayerHand)
  const [dealerCards, setDealerCards] = useState(initialDealerHand)
  const [deckOfCards, setDeckOfCards] = useState(testing ? initialTestingDeck : initialDeck)
  const [disableButtons, setDisableButtons] = useState(initialButton)
  const [action, setAction] = useState(initialAction)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(initialDealerCardFaceDown)
  const [activeHandIndex, setActiveHandIndex] = useState(initialPlayerHandIndex)
  const [playerChoice, setPlayerChoice] = useState(initialPlayerChoice)
  const [paused, setPaused] = useState(initialPauseState)

  const dealPlayerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards, testing)
    // refactor to be pure at some point
    setPlayerHands((prevHands) => {
      const newHands = [...prevHands]
      newHands[activeHandIndex] = [...newHands[activeHandIndex], card]
      return newHands
    })
    setDeckOfCards([...updatedDeckOfCards])
  }

  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards, testing)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
  }

  const handlePauseToggle = () => {
    setPaused(!paused)
    setAction(actions.standBy)
    if (paused) {
      setAction(actions.callPlayerAction)
    }
  }

  const handleReset = () => {
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDeckOfCards(testing ? initialTestingDeck : initialDeck)
    setDealCardFaceDown(initialDealerCardFaceDown)

    setPlayerChoice(initialPlayerChoice)

    setAction(initialAction)
  }

  const nextRound = () => {
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDealCardFaceDown(initialDealerCardFaceDown)
    setAction(initialAction)
    setDisableButtons(initialButton)
    setPlayerChoice(initialPlayerChoice)
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
      } else {
        setAction(actions.checkBlackjack)
      }
    } else if (action === actions.checkBlackjack) {
      // only catches a player getting dealt a blackjack
      if (handTotal(playerHands[activeHandIndex]) === 21) {
        setActiveHandIndex((prevIndex) => prevIndex + 1)
      }
      setAction(actions.checkDealerTurn)
    } else if (action === actions.dealSplitHand) {
      // player has no more hands
      if (activeHandIndex > playerHands.length - 1) {
        setAction(actions.dealerTotalCheck)
      } else if (playerHands[activeHandIndex].length < 2) {
        setTimeout(() => {
          dealPlayerCard()
        }, 300)
      } else {
        setAction(actions.checkStrategy)
      }
    } else if (action === actions.checkDealerTurn) {
      // if active index is greater than player hands length check dealer total
      if (activeHandIndex >= playerHands.length) {
        setAction(actions.dealerTotalCheck)
        // player has 21 set dealer turn
      } else if (handTotal(playerHands[activeHandIndex]) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTurn)
        }, 400)
        // if player has 21 check dealer total
      } else if (handTotal(dealerCards) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTotalCheck)
        }, 400)
      } else {
        setAction(actions.checkStrategy)
      }
    } else if (action === actions.dealerTotalCheck) {
      // dealer draws
      if (handTotal(dealerCards) < 17) {
        setAction(actions.dealerTurn)
        // dealer stands
      } else if (handTotal(dealerCards) >= 17 && handTotal(dealerCards) <= 21) {
        setDealCardFaceDown(false)
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, 2000)
        // dealer has busted
      } else if (handTotal(dealerCards) > 21) {
        console.log('Bust')
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, 2000)
      }
    } else if (action === actions.stand) {
      setActiveHandIndex((prevItem) => prevItem + 1)
      setAction(actions.dealSplitHand)
    } else if (action === actions.hit) {
      dealPlayerCard()
      setAction(actions.checkBust)
    } else if (action === actions.checkBust) {
      if (checkBust(playerHands[activeHandIndex])) {
        setActiveHandIndex((prevItem) => prevItem + 1)
      }
      setAction(actions.dealSplitHand)
    } else if (action === actions.double) {
      const [card, updatedDeckOfCards] = drawCard(deckOfCards)
      setPlayerHands((prevHands) => {
        prevHands[activeHandIndex] = [...prevHands[activeHandIndex], { ...card, double: true }]
        return prevHands
      })
      setDeckOfCards([...updatedDeckOfCards])
      setActiveHandIndex((prevIndex) => prevIndex + 1)
      setTimeout(() => {
        setAction(actions.dealSplitHand)
      }, 500)
    } else if (action === actions.split) {
      setPlayerHands((prevHands) => {
        return prevHands.flatMap((hand, index) => {
          if (activeHandIndex === index) {
            return [[hand[0]], [hand[1]]]
          }
          return [hand]
        })
      })

      setTimeout(() => {
        dealPlayerCard()
      }, 300)

      setAction(actions.checkStrategy)
    } else if (action === actions.checkStrategy) {
      // variables for strategyCheck()
      const activeHand = playerHands[activeHandIndex % playerHands.length]
      const playerHandTotal = handTotal(activeHand)
      const dealerCard = dealerCards[1].value
      const handType = getHandType(activeHand)

      console.log(handType)
      console.log(activeHand)

      const correctChoice = strategyCheck(handType, dealerCard, activeHand)

      console.log(correctChoice)
      // execute the correct choice
      setPlayerChoice(correctChoice)
      setTimeout(() => {
        setAction(actions.callPlayerAction)
      }, 1000)
    } else if (action === actions.callPlayerAction) {
      if (!paused) {
        if (playerChoice === playerChoices.stand) {
          setAction(actions.stand)
        } else if (playerChoice === playerChoices.split) {
          if (playerHands[activeHandIndex][0].value === playerHands[activeHandIndex][1].value) {
            setAction(actions.split)
          }
        } else if (playerChoice === playerChoices.double) {
          setAction(actions.double)
        } else if (playerChoice === playerChoices.hit) {
          setAction(actions.hit)
        } else {
          console.log(`Error`)
        }
      }
    } else if (action === actions.startNextRound) {
      nextRound()
    } else if (action === actions.dealerTurn) {
      setDealCardFaceDown(false)
      setDisableButtons(true)
      setTimeout(() => {
        dealDealerCard()
        setAction(actions.dealerTotalCheck)
      }, 1000)
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    }
  }, [action])

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700 relative">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />

      <div className="col-start-2 row-start-2 flex space-x-10">
        {playerHands.map((hand) => {
          return <PlayerCards key={nanoid()} cards={hand} action={action} />
        })}
      </div>

      <div className="col-start-1 row-start-2 relative">
        <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
      </div>

      <div className="col-start-1 row-start-1 relative">{testing && <HandTotal total={handTotal(dealerCards)} />}</div>

      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={handlePauseToggle} label={'Pause'} />
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
