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

const testing = false

const SpeedCounting = () => {
  const initialPauseState = true

  const delayTime = 600

  const [paused, setPaused] = useState(initialPauseState)

  const handlePauseToggle = (prevAction) => {
    setPaused(!paused)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="grid grid-cols-3 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl ">
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
    </div>
  )
}
export default SpeedCounting
