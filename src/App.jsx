import { useState } from 'react'
import './App.css'
import MonthDashboard from './components/MonthDashboard.jsx'
import YearDashboard from './components/YearDashboard.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'

// notes:
// 1. adventist, adventist community services, shady grove adventist hospital?
// 2. do they want additional descriptions for some of the items (right now the only one that has an extra description is scent transfer blankets)
// 3. nicu hats, infant hats, baby hats?
// 4. st. camillus, st. camilla's food pantry?
// 5. on July/August blanket notes, "21 toiletries and blankets" to Adentist Community Services, is there a separation into two statistics
// 6. combining July/August blanket notes --> is it ok if i just list them both in July?
// 7. make an animation for the statistics when switching between months/years, the digits change quickly to the new number

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/:year" element={<YearDashboard />} />
      <Route path="/:year/:month" element={<MonthDashboard />} />

      <Route
        path="/"
        element={<Navigate to="/2026" replace />}
      />
    </Routes>
  )
}

export default App
