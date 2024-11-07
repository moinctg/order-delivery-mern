// src/FeedbackCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
// import './Feedback.css'
const FeedbackCarousel = ({ feedbacks }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="feedback-carousel-container">
    <h2>Client Feedback</h2>
    <Slider {...settings}>
      {feedbacks.map((feedback, index) => (
        <div className="feedback-item" key={index}>
          <p className="feedback-text">{feedback.feedbackText}</p>
          <p className="feedback-rating">Rating: {feedback.rating}</p>
          <h4 className="feedback-username">{feedback.user?.name || "Anonymous"}</h4>
        </div>
      ))}
    </Slider>
  </div>
  )
};

export default FeedbackCarousel;
