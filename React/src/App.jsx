import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styles from "./App.module.css"    // Empty for now
import HomePage from "./HomePage"
import SignUpPage from "./SignUpPage";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}


export default App
