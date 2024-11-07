import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

import './Header.css'

import slider1 from '../../../src/assets/img/img1.jpg'
import slider2 from '../../../src/assets/img/img2.jpg'
import slider3 from '../../../src/assets/img/img3.jpg';
import slider4 from '../../../src/assets/img/img4.jpg';
import slider5 from '../../../src/assets/img/img5.jpg';
// import slider4 from '../../../img/banner/slide4.jpg'
// import slider5 from '../../../img/banner/slide6.jpg'

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/menu');
  };
  return (
    <div>
  
  <div>
  <Carousel>
      <Carousel.Item interval={1000}>
      <img src={slider1} alt=""/>
        <Carousel.Caption>
          <h3 className='text-white'>Fresh & Delicious Meals Delivered</h3>
          <p className='text-white'>Indulge in a world of flavors, crafted with care and delivered hot right to your door!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
       
        <img src={slider2} alt=""/>
        <Carousel.Caption>
        <h3 className='text-white'>Special Offer: Free Delivery!</h3>
  <p className='text-white'>Order your favorite dishes today and enjoy free delivery on your first purchase.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slider3} alt=""/>
        <Carousel.Caption>
        <h3 className='text-white'>Exclusive Discounts for You</h3>
        <p className='text-white'>Get 10% off on your next order! Use code: TREAT10 at checkout.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
       
       <img src={slider4} alt=""/>
       <Carousel.Caption>
       <h3 className='text-white'>Taste the Difference</h3>
       <p className='text-white'>Our chefs use the freshest ingredients to bring you mouthwatering meals you’ll love.</p>
       </Carousel.Caption>
     </Carousel.Item>
     <Carousel.Item>
     <img src={slider5} alt=""/>
       <Carousel.Caption>
         <h3>Third slide label</h3>
         <p>
           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
         </p>
       </Carousel.Caption>
     </Carousel.Item>
    </Carousel>
</div>
<div >


        <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="hero-cap text-center">
                            <h2>"Craving Your Favorite Dish? Order Now!"</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 <div className="header">

<div className="header-contents">
            
            <p>Treat yourself to your favorite meal in just a few clicks! Whether you’re in the mood for a spicy pizza, a fresh salad, or a hearty burger, we’ve got you covered. Browse through our diverse menu, packed with delicious options from local favorites to international cuisines.

Ordering is simple—just choose your dish, customize it to your liking, and we’ll deliver it hot and fresh, right to your door. Don't wait—satisfy your cravings and indulge in the best flavors today!.</p>
<button onClick={handleClick}>View Menu</button>
            </div>
            </div>
            </div>
            </div>

  )
}

export default Header