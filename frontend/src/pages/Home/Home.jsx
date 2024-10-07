import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Contact from '../../components/Contact/Contact'
import Testomonial from '../../components/Testomonial/Testomonial'
import About from '../../components/About/About'

const Home = () => {

  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <About/>
      <AppDownload/>
      <Testomonial/>
      <Contact/>
    </div>
  )
}

export default Home