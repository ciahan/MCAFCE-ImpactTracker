import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

// notes:
// 1. adventist, adventist community services, shady grove adventist hospital?
// 2. do they want additional descriptions for some of the items (right now the only one that has an extra description is scent transfer blankets)
// 3. nicu hats, infant hats, baby hats?
// 4. st. camillus, st. camilla's food pantry?
// 5. on July/August blanket notes, "21 toiletries and blankets" to Adentist Community Services, is there a separation into two statistics
// 6. combining July/August blanket notes --> is it ok if i just list them both in July?

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
