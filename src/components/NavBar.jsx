import { Link } from 'react-router-dom'
import React, { useState } from 'react'

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl mx-2">
          BlackJack Trainer
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white py-4 hover:text-gray-300">
            Game Modes
          </button>
        </div>
        <ul className={`${isMobileMenuOpen ? 'block' : 'hidden md:flex'} space-y-2 md:space-y-0 md:space-x-7`}>
          <li>
            <Link to="/StrategyTraining" className="text-white hover:text-gray-300">
              Basic Strategy Mode
            </Link>
          </li>
          <li>
            <Link to="/SpeedCounting" className="text-white hover:text-gray-300">
              High-Low Card Counting Mode
            </Link>
          </li>
          <li>
            <Link to="/CountingAndStrategy" className="text-white hover:text-gray-300">
              Realistic Scenario Mode
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
