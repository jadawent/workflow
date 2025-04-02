import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styles from "./App.module.css"    // Empty for now
import HomePage from "./views/HomePage"
import SignUpPage from "./views/SignUpPage"
import ErrorPage from "./views/ErrorPage"
import Login from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './views/Dashboard'


function App() {
  return(
      <div className="App">
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/loginSuccess" element={<ProtectedRoute> <LoginSuccess /> </ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                  <Route path="*" element={<ErrorPage />} />
              </Routes>
          </Router>
      </AuthProvider>
      </div>
  )
}

export default App
