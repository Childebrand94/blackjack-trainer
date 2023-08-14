import { Link } from 'react-router-dom'
import Button from '../components/Button'
import classNames from 'classnames'

const Home = () => {
  const number = 3
  return (
    <main className="flex justify-center">
      <h1 className={classNames('text-xl', { 'text-blue-600': number === 5 })}>Blackjack Trainer </h1>
      <Link to="/StrategyTraining">Strategy Training</Link>
      <Button to="/" label="Click me" />
    </main>
  )
}

export default Home
