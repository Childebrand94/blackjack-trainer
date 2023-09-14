import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
import { actions, playerChoices, userFeedBackResponse } from '../functions/types'
import {
  buildDecks,
  buildStackedDeck1,
  checkBust,
  drawCard,
  getHandType,
  handTotal,
  shuffleDeck,
  strategyCheck,
  getRunningCount,
  getTrueCount,
} from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Insurance from '../components/Insurance'
import BlackJack from '../components/BlackJack'
import PlayerFeedBack from '../components/PlayerFeedBack'
import PlayerAccuracy from '../components/PlayerAccuracy'
import CountStats from '../components/CountStats'
import DecksRemaining from '../components/DecksRemaining'
import TestPlayer from '../components/TestPlayer'
import TestPlayerResponse from '../components/TestPlayerResponse'

const testing = true

const StrategyTraining = () => {
  const testDeck = Array.from({ length: 50 }, (_) => {
    return {
      value: 11,
      name: 'A',
      suit: 'Hearts',
    }
  })

  const initialPlayerHand = [[]]
  const initialDealerHand = []
  const initialDeck = shuffleDeck(buildDecks(6))
  const initialTestingDeck = buildStackedDeck1(100)
  const initialButton = false
  const initialAction = actions.dealPlayer
  const initialDealerCardFaceDown = true
  const initialInsuranceDisplay = false
  const initialBlackjackDisplay = false
  const initialPlayerDisplay = false
  const initialPlayerHandIndex = 0
  const initialPlayerChoice = null
  const initialPlayerFeedback = userFeedBackResponse.default
  const initialTotalPlayerHands = 0
  const initialPlayerCorrectChoices = 0
  const initialCount = 0
  const initialRoundCount = 0
  const delayTime = 200
  const roundsToTest = 2
  const initialResponse = ''

  const [playerHands, setPlayerHands] = useState(initialPlayerHand)
  const [dealerCards, setDealerCards] = useState(initialDealerHand)
  const [deckOfCards, setDeckOfCards] = useState(testing ? shuffleDeck(buildDecks(6)) : initialDeck)
  const [disableButtons, setDisableButtons] = useState(initialButton)
  const [action, setAction] = useState(initialAction)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(initialDealerCardFaceDown)
  const [insuranceDisplayed, setInsuranceDisplay] = useState(initialInsuranceDisplay)
  const [DisplayBlackJack, setDisplayBlackJack] = useState(initialBlackjackDisplay)
  const [activeHandIndex, setActiveHandIndex] = useState(initialPlayerHandIndex)
  const [playerChoice, setPlayerChoice] = useState(initialPlayerChoice)
  const [playerFeedback, setPlayerFeedback] = useState(initialPlayerFeedback)
  const [totalPlayerHands, setTotalPlayerHands] = useState(initialTotalPlayerHands)
  const [roundCount, setRoundCount] = useState(initialRoundCount)
  const [totalPlayerCorrectChoices, setTotalPlayerCorrectChoices] = useState(initialPlayerCorrectChoices)
  const [testPlayerDisplay, setTestPlayerDisplay] = useState(initialPlayerDisplay)

  const initialDealtCards = []
  const [dealtCards, setDealtCards] = useState(initialDealtCards)
  const [trueCount, setTrueCount] = useState(initialCount)
  const [runningCount, setRunningCount] = useState(initialCount)
  const [correctPlayerResponse, setCorrectPlayerResponse] = useState(initialResponse)

  if (deckOfCards.length < 10) {
    setDeckOfCards(initialDeck)
    setDealtCards(initialDealtCards)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setAction(actions.reshuffle)
  }

  const dealPlayerCard = () => {
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
  }

  const handleChoice = (choice) => {
    if (action === actions.standBy) {
      setPlayerChoice(choice)
      setTotalPlayerHands((prevAmount) => prevAmount + 1)
      setAction(actions.checkStrategy)
    }
  }

  const handleInsuranceAccepted = () => {
    setAction(actions.insuranceAccepted)
    setInsuranceDisplay(false)
  }
  const handleInsuranceDeclined = () => {
    setAction(actions.insuranceDeclined)
    setInsuranceDisplay(false)
  }

  const handleReset = () => {
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDeckOfCards(testing ? initialTestingDeck : initialDeck)
    setDealCardFaceDown(initialDealerCardFaceDown)
    setDisableButtons(initialButton)
    setPlayerChoice(initialPlayerChoice)
    setInsuranceDisplay(initialInsuranceDisplay)
    setAction(initialAction)
    setTotalPlayerHands(initialTotalPlayerHands)
    setTotalPlayerCorrectChoices(initialPlayerCorrectChoices)
  }

  const nextRound = () => {
    setRoundCount((prevCount) => prevCount + 1)
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setDealerCards(initialDealerHand)
    setDealCardFaceDown(initialDealerCardFaceDown)
    setAction(initialAction)
    setDisableButtons(initialButton)
    setPlayerChoice(initialPlayerChoice)
  }

  const handlePlayerResponse = (userInput) => {
    if (parseInt(userInput.runningCount) === runningCount && parseInt(userInput.trueCount) === trueCount) {
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
    const currentRunningCount = getRunningCount(dealtCards)
    setRunningCount(currentRunningCount)
    setTrueCount(getTrueCount(currentRunningCount, deckOfCards.length / 52))
  }, [dealtCards])

  useEffect(() => {
    console.log(action)

    if (action === actions.dealPlayer) {
      setTimeout(() => {
        dealPlayerCard()
        setAction(actions.dealDealer)
      }, delayTime * 3)
    } else if (action === actions.dealDealer) {
      setTimeout(() => {
        dealDealerCard()
        if (dealerCards.length < 1) {
          setAction(actions.dealPlayer)
        } else {
          setAction(actions.checkInsurance)
        }
      }, delayTime * 3)
    } else if (action === actions.checkInsurance) {
      // dealer faceup card is an A show insurance display
      if (dealerCards[1].name === 'A') {
        setInsuranceDisplay(true)
      } else {
        setAction(actions.checkBlackjack)
      }
    } else if (action === actions.insuranceAccepted) {
      // if dealer shows an A and has 21 start next round
      if (handTotal(dealerCards) === 21) {
        setDealCardFaceDown(false)
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, delayTime * 10)
      }
      setAction(actions.checkBlackjack)
    } else if (action === actions.insuranceDeclined) {
      // if dealer shows an A and has 21 start next round
      setTimeout(() => {
        if (handTotal(dealerCards) === 21) {
          setDealCardFaceDown(false)
          setAction(actions.startNextRound)
        }
        setAction(actions.checkBlackjack)
      }, delayTime * 5)
    } else if (action === actions.checkBlackjack) {
      if (handTotal(playerHands[activeHandIndex]) === 21) {
        // show Blackjack pop up for 1 second
        setDisplayBlackJack(true)
        setTimeout(() => {
          setDisplayBlackJack(false)
        }, delayTime * 5)
        setActiveHandIndex((prevIndex) => prevIndex + 1)
      }
      setAction(actions.checkDealerTurn)
    } else if (action === actions.dealSplitHand) {
      // player has no more hands
      if (activeHandIndex >= playerHands.length) {
        setAction(actions.dealerTotalCheck)
      } else if (playerHands[activeHandIndex].length < 2) {
        setTimeout(() => {
          dealPlayerCard()
          setAction(actions.standBy)
        }, delayTime * 2)
      } else {
        setAction(actions.standBy)
      }
    } else if (action === actions.checkDealerTurn) {
      // if active index is greater than player hands length check dealer total
      if (activeHandIndex >= playerHands.length) {
        setAction(actions.dealerTotalCheck)
        // player has 21 set dealer turn
      } else if (handTotal(playerHands[activeHandIndex]) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTurn)
        }, delayTime * 2)
        // if player has 21 check dealer total delay for Blackjack pop up
      } else if (handTotal(dealerCards) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTotalCheck)
        }, delayTime * 2)
      } else {
        setAction(actions.standBy)
      }
    } else if (action === actions.dealerTotalCheck) {
      setTimeout(() => {
        // dealer draws
        if (handTotal(dealerCards) < 17) {
          setAction(actions.dealerTurn)
          // dealer stands
        } else if (handTotal(dealerCards) >= 17) {
          setDealCardFaceDown(false)
          if (roundCount === roundsToTest) {
            setRoundCount(initialRoundCount)
            setAction(actions.test)
          } else {
            setAction(actions.startNextRound)
          }
        }
      }, delayTime) * 10
    } else if (action === actions.test) {
      setTestPlayerDisplay(true)
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
      setAction(actions.dealSplitHand)
    } else if (action === actions.split) {
      setPlayerHands((prevHands) => {
        setTimeout(() => {
          return prevHands.flatMap((hand, index) => {
            if (activeHandIndex === index) {
              return [[hand[0]], [hand[1]]]
            }
            return [hand]
          })
        })

        dealPlayerCard()

        setAction(actions.standBy)
      }, delayTime * 2)
    } else if (action === actions.checkStrategy) {
      // variables for strategyCheck()
      const activeHand = playerHands[activeHandIndex % playerHands.length]
      const dealerCard = dealerCards[1].value
      const handType = getHandType(activeHand)

      if (testing) {
        console.log(strategyCheck(handType, dealerCard, activeHand))
      }

      // call strategyCheck
      const correctChoice = strategyCheck(handType, dealerCard, activeHand)

      // give the player feed back on decision, will not move game forward until right option is picked
      if (playerChoice === correctChoice) {
        setPlayerFeedback(userFeedBackResponse.correct)
        setTotalPlayerCorrectChoices((prevAmount) => prevAmount + 1)
        setTimeout(() => {
          setPlayerFeedback(userFeedBackResponse.default)
        }, delayTime * 3)
        setAction(actions.callPlayerAction)
      } else {
        setPlayerFeedback(userFeedBackResponse.tryAgain)
        setTimeout(() => {
          setPlayerFeedback(userFeedBackResponse.default)
          setAction(actions.standBy)
        }, delayTime * 3)
      }
    } else if (action === actions.callPlayerAction) {
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
      }
    } else if (action === actions.startNextRound) {
      setTimeout(() => {
        nextRound()
      }, delayTime * 3)
    } else if (action === actions.dealerTurn) {
      setDealCardFaceDown(false)
      setDisableButtons(true)
      setTimeout(() => {
        dealDealerCard()
        setAction(actions.dealerTotalCheck)
      }, delayTime * 10)
    } else if (action === actions.reshuffle) {
      setPlayerFeedback(userFeedBackResponse.reshuffle)
      setTimeout(() => {
        setPlayerFeedback(userFeedBackResponse.default)
        setAction(initialAction)
      }, delayTime * 2.5)
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    }
  }, [action])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="grid grid-cols-1 p-4 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl sm:grid-cols-3 ">
        {/* Dealer and Player Hands  */}

        <div className="col-start-1 row-start-1 relative min-w-[300px] min-h-[400px] sm:col-start-2">
          <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
        </div>
        <div className="col-start-1 row-start-1 flex space-x-10 sm:col-start-2 min-h-[400px] min-w-[300px] sm:row-start-2">
          {playerHands.map((hand) => {
            return <PlayerCards key={nanoid()} cards={hand} action={action} />
          })}
        </div>

        {/* Buttons */}

        <div className=" col-start-1 row-start-2 flex flex-col relative h-screen sm:col-start-3">
          <div className="flex flex-col items-end pt-24 sm:pt-6">
            <Button onClick={() => handleChoice('H')} label={'Hit'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('SP')} label={'Split'} disabled={disableButtons} />
            <Button
              onClick={() => handleChoice('D')}
              label={'Double'}
              disabled={disableButtons || playerHands[activeHandIndex % playerHands.length].length > 2}
            />
            <Button onClick={() => handleChoice('S')} label={'Stand'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('SUR')} label={'Surrender'} />
            <Button onClick={handleReset} label={'Reset'} />
            <Link to="/">
              <Button label={'Quit'} />
            </Link>
          </div>
        </div>

        {/* Hand Totals  */}
        <div className="col-start-1 row-start-1 relative sm:row-start-2 ">
          <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
        </div>
        <div className="col-start-1 row-start-1 relative">
          {testing && <HandTotal total={handTotal(dealerCards)} />}
        </div>

        {/* Running, True, DeckReaming Displays */}

        <div className="col-stat-3 row-stat-1 p-6"></div>

        <div className="col-start-1 row-start-2 pt-24 relative flex flex-col sm:items-start">
          <PlayerAccuracy totalHands={totalPlayerHands} correctChoices={totalPlayerCorrectChoices} />
          <DecksRemaining cardsDealt={dealtCards.length} />
          {testing && (
            <div className="flex flex-col w-full sm:items-start">
              <CountStats label={'Running Count'} stat={getRunningCount(dealtCards)} />
              <CountStats
                label={'True Count'}
                stat={getTrueCount(getRunningCount(dealtCards), deckOfCards.length / 52)}
              />
              <CountStats label={'Decks Remaining'} stat={(deckOfCards.length / 52).toFixed(2)} />
            </div>
          )}
        </div>

        {/* Insurance Module */}

        {insuranceDisplayed && (
          <Insurance
            handleInsuranceDeclined={handleInsuranceDeclined}
            handleInsuranceAccepted={handleInsuranceAccepted}
          />
        )}
        {DisplayBlackJack && <BlackJack />}
        {playerFeedback && <PlayerFeedBack string={playerFeedback} />}

        {/* Testing Player */}

        {testPlayerDisplay && (
          <TestPlayer
            handlePlayerResponse={handlePlayerResponse}
            runningCount={getRunningCount(dealtCards)}
            trueCount={getTrueCount(getRunningCount(dealtCards), deckOfCards.length / 52)}
          />
        )}
        {correctPlayerResponse && (
          <TestPlayerResponse
            correctResponse={correctPlayerResponse}
            runningCount={getRunningCount(dealtCards)}
            trueCount={getTrueCount(getRunningCount(dealtCards), deckOfCards.length / 52)}
          />
        )}
      </div>
    </div>
  )
}
export default StrategyTraining
