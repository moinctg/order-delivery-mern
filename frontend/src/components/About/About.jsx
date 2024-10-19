import img1 from '../../assets/img/gallery/about.png'
import img2 from '../../assets/img/gallery/about2.png'
import img3 from '../../assets/img/gallery/about3.png'
import img4 from '../../assets/img/gallery/about4.png'
const About = () => {
  return (
    <div>


      <div className="slider-area">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h1> About </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.1s"
                    src={img1}
                    alt="About 1"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.3s"
                    src={img2}
                    alt="About 2"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.5s"
                    src={img3}
                    alt="About 3"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.7s"
                    src={img4}
                    alt="About 4"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                About Us
              </h5>
              <h1 className="mb-4">
                Welcome to{" "}
                <i className="fa fa-utensils text-primary me-2"></i>Restoran
              </h1>
              <p className="mb-4">
                At [Your App Name], we believe that great food brings people together. Our mission is to make it easier for you to enjoy your favorite meals from the comfort of your home. Whether you’re craving a quick snack or a gourmet feast, we’re here to deliver fresh, delicious food straight to your door.
              </p>
              <p className="mb-4">
              We partner with the best local restaurants and chefs, offering a wide variety of cuisines to satisfy every craving. From classic comfort foods to exotic dishes from around the world, we bring the flavors you love, made with the freshest ingredients and the highest quality standards.

What sets us apart? It’s our commitment to convenience and customer satisfaction. With a user-friendly app, seamless ordering process, and fast, reliable delivery, we make sure your meal arrives hot and ready, right when you want it. Plus, our real-time tracking keeps you updated every step of the way.

At [Your App Name], food is more than just a necessity—it’s an experience. We’re passionate about creating moments of joy with every order, and we’re dedicated to serving you with care and professionalism. So sit back, relax, and let us take care of your cravings
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      15
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Years of</p>
                      <h6 className="text-uppercase mb-0">Experience</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      50
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Popular</p>
                      <h6 className="text-uppercase mb-0">Master Chefs</h6>
                    </div>
                  </div>
                </div>
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default About;