import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BasicStrategy from './pages/BasicStrategy'
import HighLowCardCounting from './pages/HighLowCardCounting'
import RealisticScenario from './pages/RealisticScenario'
import StrategyCard from './pages/StrategyCard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/BasicStrategy" element={<BasicStrategy />} />
        <Route path="/HighLowCardCounting" element={<HighLowCardCounting />} />
        <Route path="/RealisticScenario" element={<RealisticScenario />} />
        <Route path="/StrategyCard" element={<StrategyCard />} />
      </Routes>
    </Router>
  )
}

export default App
