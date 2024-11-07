import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Testomonial/Testomonial.css'
import { useUser } from '../context/StoreContext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://order-delivery-mern-backend-1.onrender.com/api/feedback');
        setFeedbacks(response.data);
      } catch (err) {
        setError('Error fetching feedback');
        console.error(err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="slider-area">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Client Feedback</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Carousel Section */}
      <div className="testimonial-section">
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <div className="testimonial-item" key={index} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <div className="testimonial-content" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
                  <img
                    src={feedback.image || 'default-avatar.png'}
                    alt={feedback.user?.name || 'Anonymous'}
                    className="testimonial-img"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }}
                  />
                  <h4>{feedback.user?.name || "Anonymous"}</h4>
                  <p>{feedback.feedbackText}</p>
                  <p>Rating: {feedback.rating}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No feedback available</p>
          )}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default FeedbackList;
