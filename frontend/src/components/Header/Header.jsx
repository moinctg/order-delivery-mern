import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import './Header.css'

import slider1 from '../../../src/assets/img/img1.jpg'
import slider2 from '../../../src/assets/img/img2.jpg'
import slider3 from '../../../src/assets/img/img3.jpg';
import slider4 from '../../../src/assets/img/img4.jpg';
import slider5 from '../../../src/assets/img/img5.jpg';
// import slider4 from '../../../img/banner/slide4.jpg'
// import slider5 from '../../../img/banner/slide6.jpg'

const Header = () => {
  return (
    <div>
  
  <div>
  <Carousel>
      <Carousel.Item interval={1000}>
      <img src={slider1} alt=""/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
       
        <img src={slider2} alt=""/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slider3} alt=""/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
       
       <img src={slider4} alt=""/>
       <Carousel.Caption>
         <h3>Second slide label</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
  <h1>Order your favourite food here</h1>
 <div className="header">

<div className="header-contents">
            
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem, dicta itaque iure fugiat architecto.</p>
            <button>View Menu</button>
            </div>
            </div>
            </div>
            </div>

  )
}

export default Header