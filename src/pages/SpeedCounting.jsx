import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
import { actions, playerChoices, userFeedBackResponse } from '../functions/types'
import {
  buildDecks,
  checkBust,
  drawCard,
  getHandType,
  handTotal,
  strategyCheck,
  getRunningCount,
  getTrueCount,
  shuffleDeck,
} from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import DecksRemaining from '../components/DecksRemaining'
import PlayerFeedBack from '../components/PlayerFeedBack'
import CountStats from '../components/CountStats'
import TestPlayer from '../components/TestPlayer'
import TestPlayerResponse from '../components/TestPlayerResponse'

const testing = true

const SpeedCounting = () => {
  const initialPlayerHand = [[]]
  const initialDealerHand = []
  const initialDealtCards = []
  const initialDeckSize = 4
  const initialDeck = shuffleDeck(buildDecks(initialDeckSize))
  const initialTestingDeck = shuffleDeck(buildDecks(initialDeckSize))
  const initialAction = actions.dealPlayer
  const initialDealerCardFaceDown = true
  const initialPlayerHandIndex = 0
  const initialPlayerChoice = null
  const initialPauseState = true
  const initialPlayerFeedback = ''
  const initialPlayerDisplay = false
  const initialResponse = ''
  const initialRoundCount = 0
  const initialCount = 0
  const roundsToTest = 3
  const delayTime = 600

  const [playerHands, setPlayerHands] = useState(initialPlayerHand)
  const [dealerCards, setDealerCards] = useState(initialDealerHand)
  const [deckOfCards, setDeckOfCards] = useState(testing ? initialTestingDeck : initialDeck)
  const [action, setAction] = useState(initialAction)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(initialDealerCardFaceDown)
  const [activeHandIndex, setActiveHandIndex] = useState(initialPlayerHandIndex)
  const [playerChoice, setPlayerChoice] = useState(initialPlayerChoice)
  const [paused, setPaused] = useState(initialPauseState)
  const [dealtCards, setDealtCards] = useState(initialDealtCards)
  const [playerFeedback, setPlayerFeedback] = useState(initialPlayerFeedback)
  const [roundCount, setRoundCount] = useState(initialRoundCount)
  const [testPlayerDisplay, setTestPlayerDisplay] = useState(initialPlayerDisplay)

  const [trueCount, setTrueCount] = useState(initialCount)
  const [runningCount, setRunningCount] = useState(initialCount)
  const [correctPlayerResponse, setCorrectPlayerResponse] = useState(initialResponse)
  const activeHand = playerHands[activeHandIndex % playerHands.length]

  if (deckOfCards.length < 10) {
    setDeckOfCards(initialDeck)
    setDealtCards(initialDealtCards)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setAction(actions.reshuffle)
  }

  const dealPlayerCard = () => {
    console.log('Dealing Player Card')
    const [card, updatedDeckOfCards] = drawCard(deckOfCards, testing)
    // refactor to be pure
    setPlayerHands((prevHands) => {
      const newHands = [...prevHands]
      newHands[activeHandIndex] = [...newHands[activeHandIndex], card]
      return newHands
    })
    setDeckOfCards([...updatedDeckOfCards])

    setDealtCards((prevCards) => [...prevCards, card])
  }

  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards, testing)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
    //For counting
    setDealtCards((prevCards) => [...prevCards, card])
  }

  const handlePauseToggle = (prevAction) => {
    setPaused(!paused)
  }
  //   const resumeAction = Object.keys(actions).find((key) => actions[key] === prevAction)
  //   if (!paused) {
  //     setAction(resumeAction)
  //   }
  // }

  const handleReset = () => {
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDeckOfCards(testing ? initialTestingDeck : initialDeck)
    setDealtCards(initialDealtCards)
    setDealCardFaceDown(initialDealerCardFaceDown)
    setPlayerChoice(initialPlayerChoice)
    setCorrectPlayerResponse(initialResponse)
    setTestPlayerDisplay(initialPlayerDisplay)
    setRunningCount(initialCount)
    setTrueCount(initialCount)
    setAction(initialAction)
  }

  const nextRound = () => {
    setRoundCount((prevCount) => prevCount + 1)
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDealCardFaceDown(initialDealerCardFaceDown)
    setAction(initialAction)
    setPlayerChoice(initialPlayerChoice)
  }

  const handlePlayerResponse = (userInput) => {
    if ((parseInt(userInput.runningCount) === runningCount, parseInt(userInput.trueCount) === trueCount)) {
      setTestPlayerDisplay(false)
      setCorrectPlayerResponse(userFeedBackResponse.correct)
      setTimeout(() => {
        setCorrectPlayerResponse(userFeedBackResponse.default)
        setAction(actions.startNextRound)
      }, delayTime * 2)
    } else {
      setTestPlayerDisplay(false)
      setCorrectPlayerResponse(userFeedBackResponse.incorrect)
      setTimeout(() => {
        setCorrectPlayerResponse(userFeedBackResponse.default)
        setAction(actions.startNextRound)
      }, delayTime * 3)
    }
  }

  useEffect(() => {
    console.log(action)
    console.log(`handTotal(activeHand) = ${handTotal(activeHand)}`)
    console.log(playerChoice)
    if (!paused) {
      if (action === actions.dealPlayer) {
        setTimeout(() => {
          dealPlayerCard()
          setAction(actions.dealDealer)
        }, delayTime * 1.5)
      } else if (action === actions.dealDealer) {
        setTimeout(() => {
          dealDealerCard()
          if (dealerCards.length < 1) {
            setAction(actions.dealPlayer)
          } else {
            setAction(actions.checkBlackjack)
          }
        }, delayTime * 1.5)
      } else if (action === actions.checkBlackjack) {
        // only catches a player getting dealt a blackjack
        if (handTotal(activeHand) === 21) {
          setActiveHandIndex((prevIndex) => prevIndex + 1)
        }
        setAction(actions.checkDealerTurn)
      } else if (action === actions.dealSplitHand) {
        // player has no more hands
        if (activeHandIndex > playerHands.length - 1) {
          setAction(actions.dealerTotalCheck)
        } else if (activeHand.length < 2) {
          setTimeout(() => {
            dealPlayerCard()
            setAction(actions.checkStrategy)
          }, delayTime)
        } else {
          setAction(actions.checkStrategy)
        }
      } else if (action === actions.checkDealerTurn) {
        // if active index is greater than player hands length check dealer total
        setTimeout(() => {
          if (activeHandIndex >= playerHands.length) {
            setAction(actions.dealerTotalCheck)
            // player has 21 set dealer turn
          } else if (handTotal(activeHand) === 21) {
            setAction(actions.dealerTurn)

            // if player has 21 check dealer total
          } else if (handTotal(dealerCards) === 21) {
            setAction(actions.dealerTotalCheck)
          } else {
            setAction(actions.checkStrategy)
          }
        }, delayTime)
      } else if (action === actions.dealerTotalCheck) {
        // dealer draws
        if (handTotal(dealerCards) < 17) {
          setAction(actions.dealerTurn)
          // dealer stands
        } else if (handTotal(dealerCards) >= 17) {
          setTimeout(() => {
            setDealCardFaceDown(false)
            if (roundCount === roundsToTest) {
              setRoundCount(initialRoundCount)
              setAction(actions.getCount)
            } else {
              setAction(actions.startNextRound)
            }
          }, delayTime * 4)
        }
      } else if (action === actions.stand) {
        setActiveHandIndex((prevItem) => prevItem + 1)
        setAction(actions.dealSplitHand)
      } else if (action === actions.hit) {
        setTimeout(() => {
          dealPlayerCard()
        }, delayTime * 2)
        setAction(actions.checkBust)
      } else if (action === actions.checkBust) {
        if (checkBust(activeHand)) {
          setActiveHandIndex((prevItem) => prevItem + 1)
        }
        setAction(actions.dealSplitHand)
      } else if (action === actions.double) {
        const [card, updatedDeckOfCards] = drawCard(deckOfCards)
        setTimeout(() => {
          setPlayerHands((prevHands) => {
            prevHands[activeHandIndex] = [...prevHands[activeHandIndex], { ...card, double: true }]
            return prevHands
          })
          setDeckOfCards([...updatedDeckOfCards])
          setDealtCards((prevCards) => [...prevCards, card])
          setActiveHandIndex((prevIndex) => prevIndex + 1)
          setAction(actions.checkBust)
        }, delayTime)
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
          setAction(actions.checkStrategy)
        }, delayTime)
      } else if (action === actions.checkStrategy) {
        // variables for strategyCheck()
        const dealerCard = dealerCards[1].value
        const handType = getHandType(activeHand)

        const correctChoice = strategyCheck(handType, dealerCard, activeHand)

        // execute the correct choice
        setPlayerChoice(correctChoice)
        setTimeout(() => {
          setAction(actions.callPlayerAction)
        }, delayTime * 2)
      } else if (action === actions.callPlayerAction) {
        if (playerChoice === playerChoices.stand) {
          setAction(actions.stand)
          setPlayerChoice(initialPlayerChoice)
        } else if (playerChoice === playerChoices.split) {
          if (activeHand[0].value === activeHand[1].value) {
            setAction(actions.split)
            setPlayerChoice(initialPlayerChoice)
          }
        } else if (playerChoice === playerChoices.double) {
          setAction(actions.double)
          setPlayerChoice(initialPlayerChoice)
        } else if (playerChoice === playerChoices.hit) {
          setAction(actions.hit)
          setPlayerChoice(initialPlayerChoice)
        } else {
          console.log('Error no match for Player Choice')
        }
      } else if (action === actions.startNextRound) {
        nextRound()
      } else if (action === actions.reshuffle) {
        setPlayerFeedback(userFeedBackResponse.reshuffle)
        setTimeout(() => {
          setPlayerFeedback(userFeedBackResponse.default)
          setAction(initialAction)
        }, delayTime * 2.5)
      } else if (action === actions.dealerTurn) {
        if (setDealCardFaceDown) {
          setTimeout(() => {
            setDealCardFaceDown(false)
          }, delayTime)
        }

        setTimeout(() => {
          dealDealerCard()
          setAction(actions.dealerTotalCheck)
        }, delayTime * 3)
      } else if (action === actions.getCount) {
        const currentRunningCount = getRunningCount(dealtCards)
        setRunningCount(currentRunningCount)
        setTrueCount(getTrueCount(currentRunningCount, deckOfCards.length / 52))
        setAction(actions.test)
      } else if (action === actions.test) {
        setTestPlayerDisplay(true)
      } else if (action === actions.surrender) {
        setAction(actions.surrender)
      }
    }
  }, [action, paused])

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700 relative">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />

      <div className="col-start-2 row-start-2 flex space-x-10">
        {playerHands.map((hand) => {
          return <PlayerCards key={nanoid()} cards={hand} />
        })}
      </div>

      <div className="col-start-1 row-start-1 relative">
        <DecksRemaining cardsDealt={dealtCards.length} />
        {testing && (
          <div>
            <CountStats label={'Running Count'} stat={getRunningCount(dealtCards)} />
            <CountStats
              label={'True Count'}
              stat={getTrueCount(getRunningCount(dealtCards), deckOfCards.length / 52)}
            />
            <CountStats label={'Decks Remaining'} stat={(deckOfCards.length / 52).toFixed(2)} />
          </div>
        )}
      </div>

      <div className="col-start-1 row-start-2 relative">
        <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
      </div>

      <div className="col-start-1 row-start-1 relative">{<HandTotal total={handTotal(dealerCards)} />}</div>

      {playerFeedback && <PlayerFeedBack string={playerFeedback} />}
      {testPlayerDisplay && (
        <TestPlayer handlePlayerResponse={handlePlayerResponse} runningCount={runningCount} trueCount={trueCount} />
      )}
      {correctPlayerResponse && (
        <TestPlayerResponse correctResponse={correctPlayerResponse} runningCount={runningCount} trueCount={trueCount} />
      )}

      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={() => handlePauseToggle(action)} label={paused ? 'Start' : 'Pause'} />
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
export default SpeedCounting
