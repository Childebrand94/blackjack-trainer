import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'
import { buildDecks, drawCard, handTotal } from '../functions/pureFunctions'
import PlayerHandTotal from '../components/PlayerHandTotal'
import { Link } from 'react-router-dom'

const StrategyTraining = () => {
  const actions = {
    standBy: 'standBy',
    dealPlayer: 'dealPlayer',
    dealDealer: 'dealDealer',
    hit: 'hit',
    stand: 'stand',
    split: 'split',
    double: 'double',
    insurance: 'insurance',
    surrender: 'surrender',
    lock: 'lock',
  }

  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState(buildDecks(6))
  const [action, setAction] = useState(actions.dealPlayer)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(true)

  const dealPlayerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
  }
  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
  }

  const onClick = () => {
    console.log('Click')
  }

  const handleHit = () => {
    setAction(actions.hit)
  }
  const handleSplit = () => {
    setAction(actions.split)
  }

  const handleStand = () => {
    setAction(actions.stand)
  }

  const handleDouble = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setPlayerCards((prevItem) => [...prevItem, { ...card, double: true }])
    setDeckOfCards([...updatedDeckOfCards])
    setAction(actions.standBy)
  }

  const handleReset = () => {
    setPlayerCards([])
    setDealerCards([])
    setDeckOfCards(buildDecks(6))
    setDealCardFaceDown(true)
    setAction(actions.dealPlayer)
  }

  const dealerDraw = () => {
    setDealCardFaceDown(false)
  }

  useEffect(() => {
    if (action === actions.dealPlayer) {
      dealPlayerCard()
      setAction(actions.dealDealer)
    } else if (action === actions.dealDealer) {
      dealDealerCard()
      if (dealerCards.length < 1) {
        setAction(actions.dealPlayer)
      }
    } else if (action === actions.hit) {
      dealPlayerCard()
      setAction(actions.standBy)
    } else if (action === actions.double) {
      dealPlayerCard()
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    } else if (action === actions.insurance) {
      setAction(actions.insurance)
    } else if (action === actions.stand) {
      dealerDraw()
    } else if (action === actions.split) {
      const updatedPlayerCards = playerCards.map((card) => ({
        ...card,
        split: true,
      }))
      setPlayerCards(updatedPlayerCards)
    }
  }, [action])

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />
      <PlayerCards cards={playerCards} action={action} />
      <PlayerHandTotal total={handTotal(playerCards)} />

      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={handleHit} label={'Hit'} />

          <Button onClick={handleSplit} label={'Split'} />

          <Button onClick={handleDouble} label={'Double'} />

          <Button onClick={handleStand} label={'Stand'} />

          <Button onClick={onClick} label={'Insurance'} />

          <Button onClick={onClick} label={'Surrender'} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Link to="/">
            <Button onClick={() => {}} label={'Quit'} />
          </Link>
          <Button onClick={handleReset} label={'Reset'} />
        </div>
      </div>
    </div>
  )
}
export default StrategyTraining
