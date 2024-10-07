import React from 'react'
import './AppDownlaod.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <div className="slider-area ">
         <div className="single-slider slider-height2 d-flex align-items-center">
             <div className="container">
                 <div className="row">
                     <div className="col-xl-12">
                         <div className="hero-cap text-center">
                             <h2>App Download</h2>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     
        <p>For Better Experience <br/>Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload