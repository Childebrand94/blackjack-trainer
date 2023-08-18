import { Link } from 'react-router-dom' // If you're using React Router

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl">
          BlackJack Trainer
        </Link>
        <ul className="flex space-x-7">
          <li>
            <Link to="/StrategyTraining" className="text-white hover:text-gray-300">
              Strategy Training
            </Link>
          </li>
          <li>
            <Link to="/SpeedCounting" className="text-white hover:text-gray-300">
              Speed Counting
            </Link>
          </li>
          <li>
            <Link to="/CountingAndStrategy" className="text-white hover:text-gray-300">
              Counting and Strategy
            </Link>
          </li>
          <li>
            <Link to="/Settings" className="text-white hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
