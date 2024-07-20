import React, { useState } from 'react'
import './StoriesSection.css'
import Cookies from "js-cookie"
import { useEffect } from 'react'

const StoriesSection = () => {

    const [userstories,setuserstories] = useState([])

    const fetchedData= async()=>{
        try {
            
            const jwtToken = Cookies.get("jwt_token")
            
            const options={
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            }
            
            const response = await fetch("https://apis.ccbp.in/insta-share/stories",options)
            
            const data = await response.json()
            const updatedData=data.users_stories.map((each)=>({
                userId:each.user_id,
                userName:each.user_name,
                storyUrl:each.story_url
                }))
            
            setuserstories(updatedData)
                
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchedData()
    },[])


  return (
    <div >
        <div className='stories-container' >
            {userstories.map((each)=>{
                return (
                    <div className='sub-stories-container'>
                        <img src={each.storyUrl} alt="user story"/>
                        <p>{each.userName}</p>
                    </div>
                )
            })}
             
        </div>   
    </div>
  )
}

export default StoriesSection