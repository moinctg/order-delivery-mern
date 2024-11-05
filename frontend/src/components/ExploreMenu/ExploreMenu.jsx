import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

    return (

<div> 
        <div className="slider-area">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                <h1> Menu</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu=text'> We take pride in offering a diverse and delectable menu that caters to every palate.
         Whether youre in the mood for comforting classics, healthy options, or adventurous new flavors, we've got you covered!

Freshly Prepared Dishes
Our chefs craft each meal using the finest, freshest ingredients sourced from local markets. From zesty appetizers to hearty main courses and delightful desserts, every dish is prepared with love and care.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=> prev === item.menu_name ? 'All' : item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
    </div>
    )
}

export default ExploreMenu