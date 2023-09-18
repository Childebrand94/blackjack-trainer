import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { gameModes } from '../functions/types'
import { handTotal, getRunningCount, getTrueCount } from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Insurance from '../components/Insurance'
import BlackJack from '../components/BlackJack'
import InteractiveFeedback from '../components/InteractiveFeedback'
import PlayerAccuracy from '../components/PlayerAccuracy'
import CountStats from '../components/CountStats'
import DecksRemaining from '../components/DecksRemaining'
import TestPlayer from '../components/TestPlayer'
import TestPlayerResponse from '../components/TestPlayerResponse'
import useGame from '../components/useGame'
import HowToPlay from '../components/HowToPlay'
import { instructionalText } from '../components/instructionalText'

const testing = false

const StrategyTraining = () => {
  const gameMode = gameModes.countingStrategy
  const delayTime = 200
  const instructionsHeading = instructionalText[gameMode].heading
  const instructions = instructionalText[gameMode].instructions

  const {
    playerHands,
    dealerCards,
    deckOfCards,
    dealCardFaceDown,
    activeHandIndex,
    dealtCards,
    playerFeedback,
    correctPlayerResponse,
    displayBlackJack,
    insuranceDisplayed,
    testPlayerDisplay,
    totalPlayerHands,
    totalPlayerCorrectChoices,
    disableButtons,
    isInstructionsOpen,
    handleReset,
    handleChoice,
    handlePlayerResponse,
    handleInsuranceAccepted,
    handleInsuranceDeclined,
    toggleInstructions,
  } = useGame({ delayTime, gameMode })

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="grid grid-cols-1 p-4 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl sm:grid-cols-3 ">
        {/* Dealer and Player Hands  */}

        <div className="col-start-1 row-start-1 relative min-w-[300px] min-h-[400px] sm:col-start-2">
          <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
        </div>
        <div className="col-start-1 row-start-1 flex space-x-10 sm:col-start-2 min-h-[400px] min-w-[300px] sm:row-start-2">
          {playerHands.map((hand) => {
            return <PlayerCards key={nanoid()} cards={hand} />
          })}
        </div>

        {/* Buttons */}

        <div className=" col-start-1 row-start-2 flex flex-col relative h-screen sm:col-start-3">
          <div className="flex flex-col items-end pt-24 sm:pt-6">
            <Button onClick={() => handleChoice('H')} label={'Hit'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('SP')} label={'Split'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('D')} label={'Double'} disabled={disableButtons} />
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
            <>
              <CountStats label={'Running Count'} stat={getRunningCount(dealtCards)} />
              <CountStats
                label={'True Count'}
                stat={getTrueCount(getRunningCount(dealtCards), deckOfCards.length / 52)}
              />
              <CountStats label={'Decks Remaining'} stat={(deckOfCards.length / 52).toFixed(2)} />
            </>
          )}
        </div>

        {/* Insurance Module */}

        {insuranceDisplayed && (
          <Insurance
            handleInsuranceDeclined={handleInsuranceDeclined}
            handleInsuranceAccepted={handleInsuranceAccepted}
          />
        )}
        {displayBlackJack && <BlackJack />}
        {playerFeedback && <InteractiveFeedback string={playerFeedback} />}

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
        {isInstructionsOpen && (
          <HowToPlay onClick={toggleInstructions} heading={instructionsHeading} instructions={instructions} />
        )}
      </div>
    </div>
  )
}
export default StrategyTraining
