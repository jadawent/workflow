import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styles from "./App.module.css"    // Empty for now
import HomePage from "./views/HomePage"
import SignUpPage from "./views/SignUpPage"
import ErrorPage from "./views/ErrorPage"
import Login from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return(
      <div className="App">
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>} />
                  <Route path="/signup" element={ <ProtectedRoute> <SignUpPage /> </ProtectedRoute>} />
                  <Route path="/loginSuccess" element={<ProtectedRoute> <LoginSuccess /> </ProtectedRoute>} />
                  <Route path="*" element={<ErrorPage />} />
              </Routes>
          </Router>
      </AuthProvider>
      </div>
  )
}

export default App
