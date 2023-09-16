import { actions, gameModes, playerChoices, userFeedBackResponse } from '../functions/types'
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
import { useEffect, useState } from 'react'

const useGame = ({ paused, delayTime, gameMode }) => {
  const testing = true

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
  const initialPlayerFeedback = userFeedBackResponse.default
  const initialPlayerDisplay = false
  const initialRoundCount = 0
  const initialCount = 0
  const initialResponse = userFeedBackResponse.default
  const roundsToTest = 2
  const initialBlackjackDisplay = false
  const initialInsuranceDisplay = false
  const initialTotalPlayerHands = 0
  const initialPlayerCorrectChoices = 0
  const initialButton = false

  const [playerHands, setPlayerHands] = useState(initialPlayerHand)
  const [dealerCards, setDealerCards] = useState(initialDealerHand)
  const [deckOfCards, setDeckOfCards] = useState(testing ? shuffleDeck(buildDecks(6)) : initialDeck)
  const [action, setAction] = useState(initialAction)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(initialDealerCardFaceDown)
  const [activeHandIndex, setActiveHandIndex] = useState(initialPlayerHandIndex)
  const [playerChoice, setPlayerChoice] = useState(initialPlayerChoice)
  const [playerFeedback, setPlayerFeedback] = useState(initialPlayerFeedback)
  const [roundCount, setRoundCount] = useState(initialRoundCount)
  const [testPlayerDisplay, setTestPlayerDisplay] = useState(initialPlayerDisplay)
  const [trueCount, setTrueCount] = useState(initialCount)
  const [runningCount, setRunningCount] = useState(initialCount)
  const [dealtCards, setDealtCards] = useState(initialDealtCards)
  const [correctPlayerResponse, setCorrectPlayerResponse] = useState(initialResponse)
  const [displayBlackJack, setDisplayBlackJack] = useState(initialBlackjackDisplay)
  const [insuranceDisplayed, setInsuranceDisplay] = useState(initialInsuranceDisplay)
  const [disableButtons, setDisableButtons] = useState(initialButton)
  const [totalPlayerHands, setTotalPlayerHands] = useState(initialTotalPlayerHands)
  const [totalPlayerCorrectChoices, setTotalPlayerCorrectChoices] = useState(initialPlayerCorrectChoices)

  const activeHand = playerHands[activeHandIndex % playerHands.length]

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
    //For counting
    setDealtCards((prevCards) => [...prevCards, card])
  }
  const handleChoice = (choice) => {
    console.log('click')
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
    setDealtCards(initialDealtCards)
    setPlayerChoice(initialPlayerChoice)
    setAction(initialAction)
    setTestPlayerDisplay(initialPlayerDisplay)
    setRunningCount(initialCount)
    setTrueCount(initialCount)
    setAction(initialAction)
    setInsuranceDisplay(initialInsuranceDisplay)
    setTotalPlayerHands(initialTotalPlayerHands)
    setTotalPlayerCorrectChoices(initialPlayerCorrectChoices)
  }
  const nextRound = () => {
    setRoundCount((prevCount) => prevCount + 1)
    setActiveHandIndex(initialPlayerHandIndex)
    setPlayerHands(initialPlayerHand)
    setTimeout(() => {
      setDealerCards(initialDealerHand)
      setDealCardFaceDown(initialDealerCardFaceDown)
      setAction(initialAction)
      setPlayerChoice(initialPlayerChoice)
      setDisableButtons(initialButton)
    }, delayTime * 5)
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
  const stateMachine = {
    dealPlayer: {
      onEnter: () => {
        setTimeout(() => {
          dealPlayerCard()
          setAction(actions.dealDealer)
        }, delayTime * 3)
      },
      transitions: {
        dealDealer: actions.dealDealer,
      },
    },
    dealDealer: {
      onEnter: () => {
        setTimeout(() => {
          dealDealerCard()
          if (dealerCards.length < 1) {
            setAction(actions.dealPlayer)
          } else if (gameMode === gameModes.speedCounting) {
            setAction(actions.checkBlackjack)
          } else {
            setAction(actions.checkInsurance)
          }
        }, delayTime * 3)
      },
      transitions: {
        dealPlayer: actions.dealPlayer,
        checkInsurance: actions.checkInsurance,
        checkBlackjack: actions.checkBlackjack,
      },
    },
    checkInsurance: {
      onEnter: () => {
        if (dealerCards[1].name === 'A') {
          setInsuranceDisplay(true)
        } else {
          setAction(actions.checkBlackjack)
        }
      },
      transitions: {
        checkBlackjack: actions.checkBlackjack,
      },
    },
    checkBlackjack: {
      onEnter: () => {
        if (handTotal(playerHands[activeHandIndex]) === 21) {
          // Speed Counting Mode
          if (gameMode === gameModes.speedCounting) {
            setActiveHandIndex((prevIndex) => prevIndex + 1)
            setAction(actions.checkDealerTurn)
          }
          // Strategy and Counting Modes
          else {
            // show Blackjack pop up for 1 second
            setDisplayBlackJack(true)
            setTimeout(() => {
              setDisplayBlackJack(false)
            }, delayTime * 5)
            setActiveHandIndex((prevIndex) => prevIndex + 1)
          }
        }
        setAction(actions.checkDealerTurn)
      },
      transitions: {
        checkDealerTurn: actions.checkDealerTurn,
      },
    },
    checkDealerTurn: {
      onEnter: () => {
        // if active index is greater than player hands length check dealer total
        setTimeout(() => {
          if (activeHandIndex >= playerHands.length) {
            setAction(actions.dealerTotalCheck)
            // player has 21 set dealer turn
          } else if (handTotal(playerHands[activeHandIndex]) === 21) {
            setAction(actions.dealerTurn)
            // if player has 21 check dealer total delay for Blackjack pop up
          } else if (handTotal(dealerCards) === 21) {
            setAction(actions.dealerTotalCheck)
          } else if (gameMode === gameModes.speedCounting) {
            setAction(actions.checkStrategy)
          } else {
            setAction(actions.standBy)
          }
        }, delayTime * 10)
      },
      transitions: {
        dealerTotalCheck: actions.dealerTotalCheck,
        dealerTurn: actions.dealerTurn,
        checkStrategy: actions.checkStrategy,
        standBy: actions.standBy,
      },
    },
    dealerTotalCheck: {
      onEnter: () => {
        setTimeout(() => {
          // dealer draws
          if (handTotal(dealerCards) < 17) {
            setAction(actions.dealerTurn)
            // dealer stands
          } else if (handTotal(dealerCards) >= 17) {
            setDealCardFaceDown(false)
            if (gameMode === gameModes.strategy) {
              setAction(actions.startNextRound)
            } else if (roundCount === roundsToTest) {
              setRoundCount(initialRoundCount)
              setAction(actions.test)
            } else {
              setAction(actions.startNextRound)
            }
          }
        }, delayTime * 6)
      },
      transitions: {
        dealerTurn: actions.dealerTurn,
        test: actions.test,
        startNextRound: actions.startNextRound,
      },
    },
    dealerTurn: {
      onEnter: () => {
        setDisableButtons(true)
        if (setDealCardFaceDown) {
          setTimeout(() => {
            setDealCardFaceDown(false)
          }, delayTime)
        }

        setTimeout(() => {
          dealDealerCard()
          setAction(actions.dealerTotalCheck)
        }, delayTime * 8)
      },
      transitions: {
        dealerTotalCheck: actions.dealerTotalCheck,
      },
    },
    test: {
      onEnter: () => {
        setTestPlayerDisplay(true)
      },
      transitions: {},
    },
    checkStrategy: {
      onEnter: () => {
        // variables for strategyCheck()
        const activeHand = playerHands[activeHandIndex % playerHands.length]
        const dealerCard = dealerCards[1].value
        const handType = getHandType(activeHand)

        if (testing) {
          console.log(strategyCheck(handType, dealerCard, activeHand))
        }

        // call strategyCheck
        const correctChoice = strategyCheck(handType, dealerCard, activeHand)

        if (gameMode === gameModes.speedCounting) {
          // execute the correct choice
          setPlayerChoice(correctChoice)
          setAction(actions.callPlayerAction)
        } else {
          // give the player feed back on decision, will not move game forward until right option is picked
          if (playerChoice === correctChoice) {
            setPlayerFeedback(userFeedBackResponse.correct)
            setTotalPlayerCorrectChoices((prevAmount) => prevAmount + 1)
            setTimeout(() => {
              setPlayerFeedback(userFeedBackResponse.default)
              setAction(actions.callPlayerAction)
            }, delayTime * 3)
          } else {
            setPlayerFeedback(userFeedBackResponse.tryAgain)
            setTimeout(() => {
              setPlayerFeedback(userFeedBackResponse.default)
              setAction(actions.standBy)
            }, delayTime * 3)
          }
        }
      },
      transitions: {
        callPlayerAction: actions.callPlayerAction,
        standBy: actions.standBy,
      },
    },
    callPlayerAction: {
      onEnter: () => {
        setTimeout(
          () => {
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
          },
          gameMode === gameModes.speedCounting ? delayTime * 2 : delayTime * 0
        )
      },
      transitions: {
        stand: actions.stand,
        split: actions.split,
        double: actions.double,
        hit: actions.hit,
      },
    },
    stand: {
      onEnter: () => {
        setActiveHandIndex((prevItem) => prevItem + 1)
        setAction(actions.dealSplitHand)
      },
      transitions: {
        dealSplitHand: actions.dealSplitHand,
      },
    },
    hit: {
      onEnter: () => {
        dealPlayerCard()
        setAction(actions.checkBust)
      },
      transitions: {
        checkBust: actions.checkBust,
      },
    },
    split: {
      onEnter: () => {
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
          if (gameMode === gameModes.speedCounting) {
            setAction(actions.checkStrategy)
          }
          setAction(actions.standBy)
        }, delayTime * 2)
      },
      transitions: {},
    },
    double: {
      onEnter: () => {
        const [card, updatedDeckOfCards] = drawCard(deckOfCards)
        setPlayerHands((prevHands) => {
          prevHands[activeHandIndex] = [...prevHands[activeHandIndex], { ...card, double: true }]
          return prevHands
        })
        setDeckOfCards([...updatedDeckOfCards])
        setDealtCards((prevCards) => [...prevCards, card])
        setActiveHandIndex((prevIndex) => prevIndex + 1)
        setAction(actions.dealSplitHand)
      },
      transitions: {
        dealSplitHand: actions.dealSplitHand,
      },
    },
    dealSplitHand: {
      onEnter: () => {
        // No more hands
        if (activeHandIndex > playerHands.length - 1) {
          setAction(actions.dealerTotalCheck)
          // Player has less than two cards
        } else if (activeHand.length < 2) {
          dealPlayerCard()
          if (gameMode === gameModes.speedCounting) {
            setAction(actions.checkStrategy)
          } else {
            setAction(actions.standBy)
          }
        } else {
          if (gameMode === gameModes.speedCounting) {
            setAction(actions.checkStrategy)
          } else {
            setAction(actions.standBy)
          }
        }
      },
      transitions: {},
    },
    checkBust: {
      onEnter: () => {
        if (checkBust(activeHand)) {
          setActiveHandIndex((prevItem) => prevItem + 1)
        }
        setAction(actions.dealSplitHand)
      },
      transitions: {
        dealSplitHand: actions.dealSplitHand,
      },
    },
    startNextRound: {
      onEnter: () => {
        setTimeout(() => {
          nextRound()
        }, delayTime * (gameMode === gameModes.speedCounting ? 3 : 5))
      },
      transitions: {},
    },
    reshuffle: {
      onEnter: () => {
        setPlayerFeedback(userFeedBackResponse.reshuffle)
        setTimeout(() => {
          setPlayerFeedback(userFeedBackResponse.default)
          setAction(initialAction)
        }, delayTime * 2.5)
      },
      transitions: {
        dealPlayer: actions.dealPlayer,
      },
    },
    insuranceAccepted: {
      onEnter: () => {
        // if dealer shows an A and has 21 start next round
        if (handTotal(dealerCards) === 21) {
          setDealCardFaceDown(false)
          setTimeout(() => {
            setAction(actions.startNextRound)
          }, delayTime * 10)
        }
        setAction(actions.checkBlackjack)
      },
      transitions: {
        checkBlackjack: actions.checkBlackjack,
      },
    },
    insuranceDeclined: {
      onEnter: () => {
        // if dealer shows an A and has 21 start next round
        setTimeout(() => {
          if (handTotal(dealerCards) === 21) {
            setDealCardFaceDown(false)
            setAction(actions.startNextRound)
          }
          setAction(actions.checkBlackjack)
        }, delayTime * 5)
      },
      transitions: {
        checkBlackjack: actions.checkBlackjack,
      },
    },
  }
  const handleStateTransition = () => {
    console.log(action)
    const currentState = stateMachine[action]

    if (currentState) {
      currentState.onEnter()
    } else {
      console.log(`${action} not found.`)
    }
  }
  useEffect(() => {
    if (!paused) {
      handleStateTransition()
    }
  }, [action, paused])

  return {
    playerHands,
    dealerCards,
    deckOfCards,
    dealCardFaceDown,
    activeHandIndex,
    dealtCards,
    playerFeedback,
    correctPlayerResponse,
    displayBlackJack,
    testPlayerDisplay,
    insuranceDisplayed,
    testPlayerDisplay,
    disableButtons,
    totalPlayerHands,
    totalPlayerCorrectChoices,
    action,
    handleReset,
    handleChoice,
    handlePlayerResponse,
    handleInsuranceAccepted,
    handleInsuranceDeclined,
  }
}

export default useGame
