import { useState, useEffect } from 'react'
import { getRunningCount } from '../functions/pureFunctions'

const useCount = (playerHands, dealerCards, dealCardFaceDown) => {
  const [runningCount, setRunningCount] = useState(0)

  if (playerHands.length < 2 || dealerCards.length < 2) return { runningCount: 0 }

  useEffect(() => {
    const currentHandCount = getRunningCount([...playerHands, ...(dealCardFaceDown ? [dealerCards[1]] : dealerCards)])

    setRunningCount((prevCount) => prevCount + currentHandCount)
  }, [playerHands, dealerCards])

  return { runningCount }
}
export default useCount
