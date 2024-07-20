import React from 'react'
import LoginFile from './components/Login/LoginFile'
import {Routes,Route} from "react-router-dom"
import Home from './components/Home/Home'
import UserProfileSection from './components/UserProfileSection/UserProfileSection'
import MyProfile from './components/MyProfile/MyProfile'

const App = () => {
  return (
    <div>
      
       <Routes> 
            
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/users/:userId" element={<UserProfileSection/>}/>
              <Route exact path="/my-profile" element={<MyProfile />} />
            
            <Route exact path="/login" element={<LoginFile />}/>
        </Routes> 
     
    </div>
  )
}

export default App