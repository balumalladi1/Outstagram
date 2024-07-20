import React, { useState } from 'react'
import Cookies from "js-cookie"

import './LoginFile.css'
import { useNavigate } from 'react-router'



const LoginFile = () => {
    const [username, setusername] = useState("")
    const [password, setuserpassword] = useState("")

    const navigate=useNavigate()
    const navigate1=()=>{
        navigate("/")
    }


    const changeusername = event => {
        setusername(event.target.value)
    }

    const changepassword = event => {
        setuserpassword(event.target.value)
    }

    const rendersucess = (JwtToken) =>{
        Cookies.set("jwt_token",JwtToken,{expires:30,path:"/"})
        navigate1()
    }

    const renderfailure = () =>{
        alert("UserId & Password is not matching")
    }

    

    const submitdetails = async (event) => {
        event.preventDefault()
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({ username, password })
            }
            const response = await fetch("https://apis.ccbp.in/login", options)

            const data = await response.json()
            
            if (response.ok === true) {
                rendersucess(data.jwt_token)
            } else {
                renderfailure()
            }
        } catch (error) {
            console.error(error)
            
        }

    }

    return (

        
        <div className='Login-container'>
            <div className="First-container">
                <img src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886071/Illustration_pm8mzg.png" alt="website login" />
            </div>
            <div className="Second-container">
                <div className="Second-container-sub-container1">
                    <img src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886387/logo_cienwq.png" alt="website logo" />
                    <p>OUTSTAGRAM</p>
                </div>
                <form onSubmit={submitdetails}>
                    <div className="Second-container-sub-container2">
                        <p>USERNAME</p>
                        <input type="text" name="username" onChange={changeusername} value={username} />
                        <p>PASSWORD</p>
                        <input type="password" name="password" onChange={changepassword} value={password} />
                        <div>
                            <button type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginFile