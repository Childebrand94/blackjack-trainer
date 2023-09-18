import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
import { gameModes } from '../functions/types'
import { handTotal } from '../functions/pureFunctions'
import HandTotal from '../components/HandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Insurance from '../components/Insurance'
import BlackJack from '../components/BlackJack'
import PlayerFeedBack from '../components/PlayerFeedBack'
import PlayerAccuracy from '../components/PlayerAccuracy'
import useGame from '../components/useGame'
import HowToPlay from '../components/HowToPlay'
import { instructionalText } from '../components/instructionalText'
const testing = true

const StrategyTraining = () => {
  const delayTime = 180
  const gameMode = gameModes.strategy
  const instructionsHeading = instructionalText[gameMode].heading
  const instructions = instructionalText[gameMode].instructions

  const {
    playerHands,
    dealerCards,
    dealCardFaceDown,
    activeHandIndex,
    playerFeedback,
    displayBlackJack,
    insuranceDisplayed,
    totalPlayerHands,
    totalPlayerCorrectChoices,
    disableButtons,
    isInstructionsOpen,
    handleReset,
    handleChoice,
    handleInsuranceAccepted,
    handleInsuranceDeclined,
    toggleInstructions,
  } = useGame({ delayTime, gameMode })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="grid grid-cols-1 p-4 gap-0 grid-rows-2 w-[1255px] h-[855px] bg-green-700  overflow-hidden relative rounded-2xl sm:grid-cols-3 ">
        {/* Dealer and Player cards */}
        <div className="col-start-1 row-start-1 relative min-w-[300px] min-h-[400px] sm:col-start-2">
          <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
        </div>
        <div className="col-start-1 row-start-1 flex space-x-10 sm:col-start-2 min-h-[400px] min-w-[300px] sm:row-start-2">
          {playerHands.map((hand) => {
            return <PlayerCards key={nanoid()} cards={hand} />
          })}
        </div>
        {/* Hand Totals */}
        <div className="col-start-1 row-start-1 relative sm:row-start-2 mt-14 sm:mt-0  ">
          <HandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
        </div>
        <div className="col-start-1 row-start-1 relative">
          {testing && <HandTotal total={handTotal(dealerCards)} />}
        </div>
        {/* Player Displays */}
        <div className="col-stat-3 row-stat-1">
          <PlayerAccuracy totalHands={totalPlayerHands} correctChoices={totalPlayerCorrectChoices} />
        </div>
        {insuranceDisplayed && (
          <Insurance
            handleInsuranceDeclined={handleInsuranceDeclined}
            handleInsuranceAccepted={handleInsuranceAccepted}
          />
        )}
        {displayBlackJack && <BlackJack />}
        {playerFeedback && <PlayerFeedBack string={playerFeedback} />}
        {/* Buttons */}
        <div className=" col-start-1 row-start-2 flex flex-col relative h-screen sm:col-start-3">
          <div className="flex flex-col items-end pt-16 sm:pt-6">
            <Button onClick={() => handleChoice('H')} label={'Hit'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('SP')} label={'Split'} disabled={disableButtons} />
            <Button
              onClick={() => handleChoice('D')}
              label={'Double'}
              disabled={disableButtons || playerHands[activeHandIndex % playerHands.length].length > 2}
            />
            <Button onClick={() => handleChoice('S')} label={'Stand'} disabled={disableButtons} />
            <Button onClick={() => handleChoice('SUR')} label={'Surrender'} />
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
export default StrategyTraining
