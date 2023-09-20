import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="h-screen relative flex flex-col justify-center items-center bg-green-700">
      <NavBar />

      <div className="flex flex-col items-center text-center text-white">
        <h2 className="text-3xl font-semibold mb-8">Start out with Learning Basic Strategy</h2>
        <div className="flex flex-col sm:flex-row">
          <Link
            to="/StrategyTraining"
            className="px-6 py-3 mb-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-lg text-center hover:text-gray-300 transition duration-300"
          >
            Basic Strategy Mode
          </Link>
          <Link
            to="/StrategyCard"
            className="px-6 ml-3 py-3 mb-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-lg text-center hover:text-gray-300 transition duration-300"
          >
            Review Strategy Card Here
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
