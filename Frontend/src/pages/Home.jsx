import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './popularClasses/PopularClasses'
import PopularTeacher from './Popular teacher/PopularTeacher'
import useAuth from '../hooks/useAuth'

const Home = () => {
  return (
    <div>
      <HeroContainer/>
      <div className=' max-w-screen-xl mx-auto'>
        <Gallery/>
        <PopularClasses/>
        <PopularTeacher/>
        
      </div>
    </div>
  )
}

export default Home
