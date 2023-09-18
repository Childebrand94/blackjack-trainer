import { Link } from 'react-router-dom'

const HowToPlay = ({ onClick }) => {
  return (
    <div className="bg-gray-400 p-6 rounded-lg shadow-md text-black absolute top-1/4 left-1/4 w-3/5 text-center">
      <h3 className="font-semibold text-2xl mx-2">Basic Strategy Practice</h3>
      <article className="p-2">
        In this game mode of the Blackjack trainer, you'll have the opportunity to refine your skills by following a set
        strategy known as 'basic strategy.' Basic strategy is a proven method that, when played correctly, can
        significantly enhance your odds of winning in Blackjack. It involves making the best possible decisions based on
        your hand and the dealer's upcard. By practicing and mastering basic strategy, you'll improve your speed and
        accuracy in making the right choices during the game. This not only makes you a more confident player but also
        increases your chances of success at the Blackjack table.
      </article>
      <div className="w-full flex space-x-10 justify-center pt-4">
        <Link
          to="/StrategyCard"
          className="px-6 ml-3 py-3 w-44 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-lg hover:text-gray-300 transition duration-300"
        >
          Strategy Card
        </Link>
        <button
          onClick={onClick}
          className="px-6 ml-3 w-44 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-lg hover:text-gray-300 transition duration-300"
        >
          Exit
        </button>
      </div>
    </div>
  )
}
export default HowToPlay
