import { useEffect, useState } from 'react'
import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/playerCards'
import { buildDecks, checkBust, delay, drawCard, handTotal } from '../functions/pureFunctions'
import PlayerHandTotal from '../components/PlayerHandTotal'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Insurance from '../components/Insurance'
import BlackJack from '../components/BlackJack'

const StrategyTraining = () => {
  const actions = {
    standBy: 'standBy',
    dealPlayer: 'dealPlayer',
    dealDealer: 'dealDealer',
    hit: 'hit',
    split: 'split',
    dealSplitHand: 'dealSplitHand',
    stand: 'stand',
    double: 'double',
    checkInsurance: 'checkInsurance',
    surrender: 'surrender',
    checkBust: 'checkBust',
    checkDealerTurn: 'checkDealerTurn',
    checkPlayerBlackjack: 'checkPlayerBlackjack',
    dealerTurn: 'dealerTurn',
    dealerTotalCheck: 'dealerTotalCheck',
    setActiveHand: 'setActiveHand',
    insuranceAccepted: 'insuranceAccepted',
    insuranceDeclined: 'insuranceDeclined',
  }

  const testDeck = Array.from({ length: 50 }, (_) => {
    return {
      value: 11,
      name: 'A',
      suit: 'Hearts',
    }
  })

  const [playerHands, setPlayerHands] = useState([[]])
  const [dealerCards, setDealerCards] = useState([])
  const [deckOfCards, setDeckOfCards] = useState(buildDecks(2))
  const [disableButtons, setDisableButtons] = useState(false)
  const [action, setAction] = useState(actions.dealPlayer)
  const [dealCardFaceDown, setDealCardFaceDown] = useState(true)
  const [insuranceDisplayed, setInsuranceDisplay] = useState(false)
  const [DisplayBlackJack, setDisplayBlackJack] = useState(false)
  const [activeHandIndex, setActiveHandIndex] = useState(0)

  const dealPlayerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    // refactor to be pure at some point
    setPlayerHands((prevHands) => {
      const newHands = [...prevHands]
      newHands[activeHandIndex] = [...newHands[activeHandIndex], card]
      return newHands
    })
    setDeckOfCards([...updatedDeckOfCards])
  }

  const dealDealerCard = () => {
    const [card, updatedDeckOfCards] = drawCard(deckOfCards)
    setDealerCards((prevItem) => [...prevItem, card])
    setDeckOfCards([...updatedDeckOfCards])
  }

  const handleHit = () => {
    setAction(actions.hit)
  }
  const handleSplit = () => {
    if (playerHands[activeHandIndex][0].name === playerHands[activeHandIndex][1].name) {
      setAction(actions.split)
    }
  }

  const handleStand = () => {
    setAction(actions.stand)
  }

  const handleDouble = () => {
    setAction(actions.double)
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
    setActiveHandIndex(0)
    setPlayerHands([[]])
    setDealerCards([])
    setDeckOfCards(buildDecks(6))
    setDealCardFaceDown(true)
    setDisableButtons(false)
    setInsuranceDisplay(false)
    setAction(actions.dealPlayer)
  }

  const nextRound = () => {
    setPlayerHands([])
    setDealerCards([])
    setDealCardFaceDown(true)
    setAction(actions.dealPlayer)
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
      if (dealerCards[1].name === 'A') {
        setInsuranceDisplay(true)
      } else {
        setAction(actions.checkPlayerBlackjack)
      }
    } else if (actions === actions.insuranceAccepted) {
      setAction(actions.checkPlayerBlackjack)
    } else if (actions === actions.insuranceDeclined) {
      setAction(actions.checkPlayerBlackjack)
    } else if (action === actions.checkPlayerBlackjack) {
      if (handTotal(playerHands[activeHandIndex]) === 21) {
        // show Blackjack pop up for 1 second
        setDisplayBlackJack(true)
        setTimeout(() => {
          setDisplayBlackJack(false)
        }, 1000)
        setActiveHandIndex((prevIndex) => prevIndex + 1)
      }
      setAction(actions.checkDealerTurn)
    } else if (action === actions.checkDealerTurn) {
      // if active index is greater than player hands length check dealer total
      if (activeHandIndex >= playerHands.length) {
        setAction(actions.dealerTotalCheck)
        // player has 21 set dealer turn
      } else if (handTotal(playerHands[activeHandIndex]) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTurn)
        }, 300)
        // if player has 21 check dealer total delay for Blackjack pop up
      } else if (handTotal(dealerCards) === 21) {
        setTimeout(() => {
          setAction(actions.dealerTotalCheck)
        }, 300)
        // if player has split and the additional hand has 1 card deal a card
      } else if (playerHands[activeHandIndex].length < 2) {
        setTimeout(() => {
          dealPlayerCard()
        }, 300)
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
        setAction(actions.standBy)
        // dealer has busted
      } else if (handTotal(dealerCards) > 21) {
        console.log('Bust')
      } else {
        console.log('End')
      }
    } else if (action === actions.stand) {
      setActiveHandIndex((prevItem) => prevItem + 1)
      setAction(actions.checkDealerTurn)
    } else if (action === actions.hit) {
      dealPlayerCard()
      setAction(actions.checkBust)
    } else if (action === actions.checkBust) {
      if (checkBust(playerHands[activeHandIndex])) {
        setActiveHandIndex((prevItem) => prevItem + 1)
      }
      setAction(actions.checkDealerTurn)
    } else if (action === actions.double) {
      const [card, updatedDeckOfCards] = drawCard(deckOfCards)
      setPlayerHands((prevHands) => {
        prevHands[activeHandIndex] = [...prevHands[activeHandIndex], { ...card, double: true }]
        return prevHands
      })
      setDeckOfCards([...updatedDeckOfCards])
      setActiveHandIndex((prevIndex) => prevIndex + 1)
      setAction(actions.checkDealerTurn)
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
      }, 300)

      setAction(actions.standBy)
    } else if (action === actions.dealerTurn) {
      setDealCardFaceDown(false)
      setDisableButtons(true)
      setTimeout(() => {
        dealDealerCard()
        setAction(actions.dealerTotalCheck)
      }, 1000)
    } else if (action === actions.surrender) {
      setAction(actions.surrender)
    }
  }, [action])

  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700 relative">
      <DealerCards cards={dealerCards} faceDown={dealCardFaceDown} />

      <div className="col-start-2 row-start-2 flex space-x-10">
        {playerHands.map((hand) => {
          return <PlayerCards key={nanoid()} cards={hand} action={action} />
        })}
      </div>
      <div className="col-start-1 row-start-2 relative">
        <PlayerHandTotal total={handTotal(playerHands[activeHandIndex % playerHands.length])} />
      </div>

      <div className="col-start-1 row-start-1 relative">
        <PlayerHandTotal total={handTotal(dealerCards)} />
      </div>

      {insuranceDisplayed && (
        <Insurance
          handleInsuranceDeclined={handleInsuranceDeclined}
          handleInsuranceAccepted={handleInsuranceAccepted}
        />
      )}
      {DisplayBlackJack && <BlackJack />}
      <div className="col-start-3 row-start-2 relative">
        <div className="flex items-end flex-col">
          <Button onClick={handleHit} label={'Hit'} disabled={disableButtons} />

          <Button onClick={handleSplit} label={'Split'} disabled={disableButtons} />

          <Button onClick={handleDouble} label={'Double'} disabled={disableButtons} />

          <Button onClick={handleStand} label={'Stand'} disabled={disableButtons} />

          <Button onClick={() => {}} label={'Surrender'} />
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
export default StrategyTraining
