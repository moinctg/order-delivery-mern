
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import img1 from '../../../src/assets/img/testimonial-1.jpg'
// import img2 from '../../../src/assets/img/testimonial-2.jpg'
// import img3 from '../../../src/assets/img/testimonial-2.jpg'

const Testomonial = () =>{
    const testimonials = [
        {
          name: "John Doe",
          designation: "CEO, Company",
          testimonial:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/100",
        },
        {
          name: "Jane Smith",
          designation: "Marketing Head, Company",
          testimonial:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://via.placeholder.com/100",
        },
        {
          name: "Sam Wilson",
          designation: "CTO, Tech Company",
          testimonial:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          image: "https://via.placeholder.com/100",
        },
      ];
    return(
        // <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        // <div className="container">
        //     <div className="text-center">
        //         <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
        //         <h1 className="mb-5">Our Clients Say!!!</h1>
        //     </div>
            
              
                
        //         </div>
        // <OwlCarousel className='owl-theme' loop margin={10} nav>
        // <div className='item'>
        //     <h4>1</h4>
        // </div>
        // <div className='item'>
        //     <h4>2</h4>
        // </div>
        // <div className='item'>
        //     <h4>3</h4>
        // </div>
        // {/* <div classNameName='item'>
        //     <h4>4</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>5</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>6</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>7</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>8</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>9</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>10</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>11</h4>
        // </div>
        // <div classNameName='item'>
        //     <h4>12</h4>
        // </div> */}
        // </OwlCarousel>

        <div className="testimonial-section">
      <h2>What Our Clients Say</h2>
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        nav
        dots={true}
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        }}
      >
        {testimonials.map((item, index) => (
          <div className="testimonial-item" key={index}>
            <div className="testimonial-content">
              <img
                src={item.image}
                alt={item.name}
                className="testimonial-img"
              />
              <p>{item.testimonial}</p>
              <h4>{item.name}</h4>
              <h6>{item.designation}</h6>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>




    )

    
    
}

export default Testomonial