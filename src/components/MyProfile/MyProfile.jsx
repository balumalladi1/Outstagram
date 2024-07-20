import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import './MyProfile.css'
import Header from '../Header/Header'


const MyProfile = () => {
    const [myprofile,setmyprofile] = useState({})
    const [myprofile1,setmyprofile1] = useState([])
    const [myprofile2,setmyprofile2] = useState([])

    const fecthData=async()=>{
        try {
            const JwtToken=Cookies.get("jwt_token")
            const options = {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${JwtToken}`
                }
            }
            const response=await fetch("https://apis.ccbp.in/insta-share/my-profile",options)
            const data=await response.json()
            setmyprofile(data.profile)
            setmyprofile1(data.profile.posts)
            setmyprofile2(data.profile.stories)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fecthData()
    },[])

  return (
    <div>
        <Header />
        <div className="myprofile-section-container">
            <p className='para'>{myprofile.user_id}</p>
            <div className="img-section">
                <div className="img-section1">
                    <img src={myprofile.profile_pic} alt="my profile"/> 
                </div>
                <div className="img-section2">
                    <p>{myprofile.posts_count}</p>
                    <p>posts</p>
                </div>
                <div className="img-section2">
                    <p>{myprofile.followers_count}</p>
                    <p>followers</p>
                </div>
                <div className="img-section2">
                    <p>{myprofile.following_count}</p>
                    <p>following</p>
                </div>
            </div>
            <div className="bio-section">
                <p>{myprofile.user_name}</p>
                <p>{myprofile.user_bio}</p>
            </div>
        </div>  
        <div className='image-posts-section-inside'>
            {myprofile1.map((item)=>{
                    return (
                        <div className='images1'>
                            <img src={item.image} alt="my story" />
                        </div>
                    )
                })} 
        </div>
        <hr className='line-1'/>
        <p className='para1'>Posts</p>
        <div className='image-posts-section-inside2'>
            {myprofile2.map((item)=>{
                    return (
                        <div className='images2'>
                            <img src={item.image} alt="my story" />
                        </div>
                    )
                })} 
        </div>
    </div>
  )
}

export default MyProfile