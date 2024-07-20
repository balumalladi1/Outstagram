import React, { useEffect, useState } from 'react'
import './UserProfileSection.css'
import Cookies from "js-cookie"
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'

const UserProfileSection = () => {
    const [userdetails, setuserdetails] = useState({})
    const [userdetails1, setuserdetails1] = useState([])
    const [userdetails2, setuserdetails2] = useState([])
    const { userId } = useParams()
    const fetchuserdetails = async () => {
        try {
            const JwtToken = Cookies.get("jwt_token")
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JwtToken}`
                }
            }
            const response = await fetch(`https://apis.ccbp.in/insta-share/users/${userId}`, options)
            const data = await response.json()
            setuserdetails(data.user_details)
            setuserdetails1(data.user_details.posts)
            setuserdetails2(data.user_details.stories)
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        fetchuserdetails()
    }, [])
    return (
        <div>
            <Header />
            <p className="userprofilename">{userdetails.user_name}</p>
            <div className="userprofilesection">
                <div className="subsection-userprofilesection1">
                    <img src={userdetails.profile_pic} alt="user profile"/>
                </div>
                <div className="subsection-userprofilesection2">
                    <div className="detail-styling-section">
                        <p>{userdetails.posts_count}</p>
                        <p>posts</p>
                    </div>
                    <div className="detail-styling-section">
                        <p>{userdetails.followers_count}</p>
                        <p>followers</p>
                    </div>
                    <div className="detail-styling-section">
                        <p>{userdetails.following_count}</p>
                        <p>following</p>
                    </div>
                </div>
            </div>
            <div className="user-bio-section">
                <p>{userdetails.user_id}</p>
                <p>{userdetails.user_bio}</p>
                
            </div> 
            <div className='userprofile-postcontainer' >
                <div className='user-story-section-container'>
                    {userdetails2.map((item)=>{
                        return (
                            <div>
                                <img src={item.image} />
                            </div>
                        )
                    })}
                </div>
            <hr className='line'/>
            <p className='para4'>Posts</p>
                <div className='userprofile-postcontainer1'>
                {userdetails1.map((item1)=>{
                    return (
                        <>   
                        <div  key={item1.id}>
                            <img src={item1.image} alt="user post" />
                        </div>
                        </>
                    )
                })}
                </div>
                
            </div>
            
      </div>   
       
    )
}

export default UserProfileSection