import React, { useState ,useContext,useEffect} from 'react';
import axios from 'axios';
import { StoreContext,useUser } from '../context/StoreContext';


const FeedbackForm = () => {
    const {url, token} = useContext(StoreContext);
    const { user, setUser } = useUser()
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState(''); // To display a success/error message after submission

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url+'/api/feedback/submit',{},{headers:{token}})
                user
                feedbackText,
                rating,
                // add userId if needed
         
            setMessage('Feedback submitted successfully!');
            setFeedbackText(''); // Clear the form
            setRating(0);
        } catch (error) {
            setMessage('Error submitting feedback');
            console.error(error);
        }
    };

    useEffect(()=>{
        if(token){
            handleSubmit();
        }
    },[token])

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
                
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', cursor: 'pointer'  } }>Submit</button>
            </form>
            
            {message && <p>{message}</p>}
        </div>
        </>
    );
};

export default FeedbackForm;
