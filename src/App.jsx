import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StrategyTraining from './pages/StrategyTraining'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/StrategyTraining" element={<StrategyTraining />} />
      </Routes>
    </Router>
  )
}

export default App
