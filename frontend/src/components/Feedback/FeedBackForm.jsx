import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const FeedbackForm = () => {
    const { url, user } = useContext(StoreContext); // No token, only user needed
    const [nameText, setNameText] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState(''); // To display a success/error message after submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is logged in (user._id exists)
        // if (!user || !user._id) {
        //     setMessage("User is not logged in. Please log in to submit feedback.");
        //     console.error("User data not found.");
        //     return;
        // }

        try {
            // Submit feedback without token validation
            const response = await axios.post(
                `${url}/api/feedback/submit`, // Ensure the URL is correct
                {
                    nameText, // Send only user._id, feedbackText, and rating
                    feedbackText,
                    rating,
                }
            );

            // Successfully submitted feedback
            console.log(response.data);
            setMessage('Feedback submitted successfully!');
            setNameText('')
            setFeedbackText('');
            setRating(0);
        } catch (error) {
            // Handle errors
            console.error(error);

            if (error.response?.status === 404) {
                setMessage("API endpoint not found.");
            } else {
                setMessage("Error submitting feedback.");
            }
        }
    };

    useEffect(() => {
        // Log user for debugging
        console.log("User:", user);
    }, [user]);

    return (
        <> 
            <div className="slider-area">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap text-center">
                                    <h1> Feedback </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Submit Your Feedback</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="feedbackText">Full Name:</label>
                        <textarea
                            id="nameText"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                            style={{ width: '100%', padding: '10px' }}
                            placeholder="Enter your feedback here"
                        ></textarea>
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="feedbackText">Feedback:</label>
                        <textarea
                            id="feedbackText"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            style={{ width: '100%', padding: '10px' }}
                            placeholder="Enter your feedback here"
                        ></textarea>
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            style={{ width: '100%', padding: '10px' }}
                            placeholder="Rate between 1 and 5"
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary" style={{ padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
                </form>
                
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default FeedbackForm;
