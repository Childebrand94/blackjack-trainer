import { Link } from 'react-router-dom'
import React, { useState } from 'react'

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gray-800 p-6 absolute top-0 z-10 w-screen">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl mx-2 hidden md:block">
          BlackJack Trainer
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-lg font-semibold hover:text-gray-300 flex items-center"
          >
            Game Modes
            {isMobileMenuOpen ? (
              <img className="h-5 ml-2" src={new URL('/assets/up-arrow.png', import.meta.url).href} alt="Up Arrow" />
            ) : (
              <img
                className="h-5 ml-2"
                src={new URL('/assets/down-arrow.png', import.meta.url).href}
                alt="Dropdown Arrow"
              />
            )}
          </button>
        </div>
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden md:flex'
          } space-y-2 md:space-y-0 md:space-x-7 mt-4 md:mt-0`}
        >
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
