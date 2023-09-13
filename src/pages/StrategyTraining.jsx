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
} from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Insurance from '../components/Insurance'
import BlackJack from '../components/BlackJack'
import PlayerFeedBack from '../components/PlayerFeedBack'
import PlayerAccuracy from '../components/PlayerAccuracy'

const testing = false

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
  const initialPlayerHandIndex = 0
  const initialPlayerChoice = null
  const initialPlayerFeedback = userFeedBackResponse.default
  const initialTotalPlayerHands = 0
  const initialPlayerCorrectChoices = 0
  const delayTime = 200

  const [playerHands, setPlayerHands] = useState(initialPlayerHand)
  const [dealerCards, setDealerCards] = useState(initialDealerHand)
  const [deckOfCards, setDeckOfCards] = useState(testing ? initialTestingDeck : initialDeck)
  const [disableButtons, setDisableButtons] = useState(initialButton)
  const [action, setAction] = useState(initialAction)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(initialDealerCardFaceDown)
  const [insuranceDisplayed, setInsuranceDisplay] = useState(initialInsuranceDisplay)
  const [DisplayBlackJack, setDisplayBlackJack] = useState(initialBlackjackDisplay)
  const [activeHandIndex, setActiveHandIndex] = useState(initialPlayerHandIndex)
  const [playerChoice, setPlayerChoice] = useState(initialPlayerChoice)
  const [playerFeedback, setPlayerFeedback] = useState(initialPlayerFeedback)
  const [totalPlayerHands, setTotalPlayerHands] = useState(initialTotalPlayerHands)
  const [totalPlayerCorrectChoices, setTotalPlayerCorrectChoices] = useState(initialPlayerCorrectChoices)

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
        setAction(actions.checkInsurance)
      }
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
      if (handTotal(dealerCards) === 21) {
        setDealCardFaceDown(false)
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, delayTime * 10)
      }
      setAction(actions.checkBlackjack)
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
      // dealer draws
      if (handTotal(dealerCards) < 17) {
        setAction(actions.dealerTurn)
        // dealer stands
      } else if (handTotal(dealerCards) >= 17 && handTotal(dealerCards) <= 21) {
        setDealCardFaceDown(false)
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, delayTime * 10)
        // dealer has busted
      } else if (handTotal(dealerCards) > 21) {
        console.log('Bust')
        setTimeout(() => {
          setAction(actions.startNextRound)
        }, delayTime * 10)
      } else {
        console.log('End')
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
      setAction(actions.dealSplitHand)
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
      }, delayTime * 2)

      setAction(actions.standBy)
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
      nextRound()
    } else if (action === actions.dealerTurn) {
      setDealCardFaceDown(false)
      setDisableButtons(true)
      setTimeout(() => {
        dealDealerCard()
        setAction(actions.dealerTotalCheck)
      }, delayTime * 5)
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    }
  }, [action])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="grid grid-cols-3 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl ">
        <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />

        <div className="col-start-2 row-start-2 flex space-x-10">
          {playerHands.map((hand) => {
            return <PlayerCards key={nanoid()} cards={hand} action={action} />
          })}
        </div>

        <div className="col-start-1 row-start-2 relative">
          <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
        </div>

        <div className="col-start-1 row-start-1 relative">
          {testing && <HandTotal total={handTotal(dealerCards)} />}
        </div>
        <div className="col-stat-3 row-stat-1">
          <PlayerAccuracy totalHands={totalPlayerHands} correctChoices={totalPlayerCorrectChoices} />
        </div>
        {insuranceDisplayed && (
          <Insurance
            handleInsuranceDeclined={handleInsuranceDeclined}
            handleInsuranceAccepted={handleInsuranceAccepted}
          />
        )}
        {DisplayBlackJack && <BlackJack />}
        {playerFeedback && <PlayerFeedBack string={playerFeedback} />}
        <div className="col-start-3 row-start-2 relative">
          <div className="flex items-end flex-col">
            <Button onClick={() => handleChoice('H')} label={'Hit'} disabled={disableButtons} />

            <Button onClick={() => handleChoice('SP')} label={'Split'} disabled={disableButtons} />

            <Button
              onClick={() => handleChoice('D')}
              label={'Double'}
              disabled={disableButtons || playerHands[activeHandIndex % playerHands.length].length > 2}
            />

            <Button onClick={() => handleChoice('S')} label={'Stand'} disabled={disableButtons} />

            <Button onClick={() => handleChoice('SUR')} label={'Surrender'} />
          </div>
          <div className="absolute bottom-0 right-0">
            <Link to="/">
              <Button label={'Quit'} />
            </Link>
            <Button onClick={handleReset} label={'Reset'} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StrategyTraining
