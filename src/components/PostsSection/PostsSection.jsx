import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { BsHeart, BsChat, BsFillCursorFill } from "react-icons/bs";
import './PostsSection.css'
import { Link } from 'react-router-dom';

const PostsSection = () => {
    const [userposts, setuserposts] = useState([])
    const userpostsdisplaysection = async () => {
        try {
            const JwtToken = Cookies.get("jwt_token")
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JwtToken}`
                }
            }
            const response = await fetch("https://apis.ccbp.in/insta-share/posts", options)
            const data = await response.json()
            const updateddata = data.posts.map((each) => ({
                postid: each.post_id,
                userId: each.user_id,
                userName: each.user_name,
                profilepic: each.profile_pic,
                postsimageUrl: each.post_details.image_url,
                postscaption: each.post_details.caption,
                likesCount: each.likes_count,
                createdAt: each.created_at,
            }))
          
            setuserposts(updateddata)
            
           
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        userpostsdisplaysection()
    }, [])

    return (
        <div>
            {userposts.map((each) => {
                return (
                    <div className="posts-container">
                        <Link to={`/users/${each.userId}`}>
                            <div className="user-details">
                                <img src={each.profilepic} alt="post author profile" />
                                <p>{each.userName}</p>
                            </div>
                        </Link>
                        <div className="post-images">
                            <img src={each.postsimageUrl} alt="post" />
                        </div>
                        <div className="icons-container">
                            <BsHeart testid="likeIcon" className='icons' />
                            <BsChat testid="unLikeIcon" className='icons' />
                            <BsFillCursorFill className='icons' />
                        </div>
                        <div className="like-container">
                            <p>{each.likesCount} likes</p>
                            <p>{each.postscaption}</p>
                            <p>{each.createdAt}</p>
                        </div>
                    </div>
                )
            })}
           
            
        </div>
    )
}

export default PostsSection