import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/StoreContext';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { user, setUser } = useUser();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/feedback'); // Ensure your API URL is correct
                setFeedbacks(response.data); // Ensure your API response structure matches this
            } catch (err) {
                setError('Error fetching feedback');
                console.error(err);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Client Feedback</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                    <div key={feedback._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                        {/* Only render name if feedback.user exists */}
                        <h4>{feedback.user?.name || "Anonymous"}</h4> 
                        <p>{feedback.feedbackText}</p>
                        <p>Rating: {feedback.rating}</p>
                    </div>
                ))
            ) : (
                <p>No feedback available</p>
            )}
        </div>
    );
};

export default FeedbackList;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { StoreContext, useUser } from '../context/StoreContext';

// const FeedbackList = () => {

//     const [feedbacks, setFeedbacks] = useState([]);
//     const { user, setUser } = useUser()
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchFeedbacks = async () => {
//             try {
//                 const response = await axios.get(' http://localhost:8000/api/feedback');
//                 console.log(response) // Replace with your API URL
//                 setFeedbacks(response.data); // Ensure your API response structure matches this
//             } catch (err) {
//                 setError('Error fetching feedback');
//                 console.error(err);
//             }
//         };

//         fetchFeedbacks();
//     }, []);

//     return (
//         <>

//         <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//             <h2>Client Feedback</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
            
//             {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
//                 feedbacks.map((feedback) => (
//                     <div key={feedback._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
//                         <h4>{feedback.user.name}</h4> {/* Assuming feedback contains `user` object with `name` */}
//                         <p>{feedback.feedbackText}</p>
//                         <p>Rating: {feedback.rating}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No feedback available</p>
//             )}
//         </div>
//         </>
//     );
// };

// export default FeedbackList;
