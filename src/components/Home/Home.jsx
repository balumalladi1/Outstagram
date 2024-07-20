import React from 'react'
import "./Homeindex.css"
import Header from '../Header/Header'
import StoriesSection from '../StoriesSection/StoriesSection'
import PostsSection from '../PostsSection/PostsSection'

const Home = () => {
  return (
    <div>
        <Header />
        <StoriesSection />
        <PostsSection />
    </div>
  )
}

export default Home