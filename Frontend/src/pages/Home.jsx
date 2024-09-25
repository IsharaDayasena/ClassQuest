import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'

const Home = () => {
  return (
    <div>
      <HeroContainer/>
      <div className=' max-w-screen-xl mx-auto'>
        <Gallery/>
      </div>
    </div>
  )
}

export default Home
