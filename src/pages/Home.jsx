import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <div className="flex items-center justify-center">
        <div className="text-center bg-gray-300 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blackjack Trainer </h1>
          <Link
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
            to="/StrategyTraining"
          >
            Strategy Training
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
