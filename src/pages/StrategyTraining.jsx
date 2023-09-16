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
    setInsuranceDisplay(initialInsuranceDisplay)
    setTotalPlayerHands(initialTotalPlayerHands)
    setTotalPlayerCorrectChoices(initialPlayerCorrectChoices)
  }

  const nextRound = () => {
    setDisableButtons(initialButton)
  }

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
