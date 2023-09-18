import { Link } from 'react-router-dom'

const HowToPlay = ({ onClick, heading, instructions }) => {
  return (
    <div className="bg-gray-400 p-6 rounded-lg shadow-md text-black absolute top-1/4 left-1/4 w-3/5 text-center">
      <h3 className="font-semibold text-2xl mx-2">{heading}</h3>
      <article className="p-2">{instructions}</article>
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
          Close
        </button>
      </div>
    </div>
  )
}
export default HowToPlay
