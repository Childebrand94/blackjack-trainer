import { useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { gameModes } from '../functions/types'
import { handTotal, getRunningCount, getTrueCount } from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import DecksRemaining from '../components/DecksRemaining'
import PlayerFeedBack from '../components/PlayerFeedBack'
import CountStats from '../components/CountStats'
import TestPlayer from '../components/TestPlayer'
import TestPlayerResponse from '../components/TestPlayerResponse'
import useGame from '../components/useGame'
import { instructionalText } from '../components/instructionalText'
import HowToPlay from '../components/HowToPlay'

const testing = false

const SpeedCounting = () => {
  const initialPauseState = true
  const delayTime = 250
  const gameMode = gameModes.speedCounting
  const instructionsHeading = instructionalText[gameMode].heading
  const instructions = instructionalText[gameMode].instructions

  const [paused, setPaused] = useState(initialPauseState)

  const handlePauseToggle = () => {
    setPaused(!paused)
  }

  const {
    playerHands,
    dealerCards,
    deckOfCards,
    dealCardFaceDown,
    activeHandIndex,
    dealtCards,
    playerFeedback,
    correctPlayerResponse,
    testPlayerDisplay,
    action,
    isInstructionsOpen,
    handleReset,
    handlePlayerResponse,
    toggleInstructions,
  } = useGame({ paused, delayTime, gameMode })

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="grid grid-cols-1 p-4 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl sm:grid-cols-3 ">
        {/* Dealer and Player Cards */}

        <div className="col-start-1 row-start-1 relative min-w-[300px] min-h-[400px] sm:col-start-2">
          <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
        </div>

        <div className="col-start-1 row-start-1 flex space-x-10 sm:col-start-2 min-h-[400px] min-w-[300px] sm:row-start-2">
          {playerHands.map((hand) => {
            return <PlayerCards key={nanoid()} cards={hand} />
          })}
        </div>

        {/* Displays */}

        <div className="col-start-1 row-start-2 relative flex flex-col pt-6 sm:row-start-1 sm:pt-0 ">
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

        {/* HandTotals */}

        <div className="col-start-1 row-start-1 relative sm:row-start-2 mt-14 sm:mt-0  ">
          {testing && <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />}
        </div>

        <div className="col-start-1 row-start-1 relative">
          {testing && <HandTotal total={handTotal(dealerCards)} />}
        </div>

        {/* Test Display */}

        {playerFeedback && <PlayerFeedBack string={playerFeedback} />}
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

        {/* Buttons */}

        <div className="col-start-3 row-start-2 relative">
          <div className="flex items-end flex-col mt-56 ">
            <Button onClick={() => handlePauseToggle(action)} label={paused ? 'Start' : 'Pause'} />
            <Link to="/">
              <Button label={'Quit'} />
            </Link>
            <Button onClick={handleReset} label={'Reset'} />
          </div>
        </div>
        {isInstructionsOpen && (
          <HowToPlay onClick={toggleInstructions} heading={instructionsHeading} instructions={instructions} />
        )}
      </div>
    </div>
  )
}
export default SpeedCounting
