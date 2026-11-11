import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import Term from './pages/Term'
import Privacy from './pages/Privacy'
import ForgotPassword from './pages/ForgotPassword'
import ForgetPassword from './pages/ForgetPassword'
import Dashboard from './pages/Dashboard'
import ExploreIdeas from './pages/ExploreIdeas'
import ManageUsers from './pages/ManageUsers'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
        <Route path='/login' element = {<LoginPage/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
         <Route path='/terms' element = {<Term/>}/>
        <Route path='/privacy' element = {<Privacy/>}/>
        <Route path='/ForgetPassword' element = {<ForgotPassword/>}/>
         <Route path='/reset-password' element = {<ForgetPassword/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path='/exploreIdeas' element = {<ExploreIdeas/>}/>
           <Route path='/how-it-works' element = {<HowItWorks/>}/>
            <Route path='/about' element = {<About/>}/>

    </Routes>
    </>
  )
}

export default App
