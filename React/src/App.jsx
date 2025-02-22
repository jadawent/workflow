import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styles from "./App.module.css"    // Empty for now
import HomePage from "./views/HomePage"
import SignUpPage from "./views/SignUpPage"
import ErrorPage from "./views/ErrorPage"
import Dashboard from "./views/Dashboard"


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}


export default App
