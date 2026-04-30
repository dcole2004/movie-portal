import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ movie_title: '', review_text: '' });

  // Update this to your live URL
  const API_URL = 'http://symptra.gt.tc/movieportal/db.php';

  // Fetch reviews from the database
  const fetchReviews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ movie_title: '', review_text: '' });
        fetchReviews(); // Refresh list after posting
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Review Portal</h1>
        
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            name="movie_title"
            placeholder="Movie Title"
            value={formData.movie_title}
            onChange={handleChange}
            required
          />
          <textarea
            name="review_text"
            placeholder="Write your review here..."
            value={formData.review_text}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          <h2>Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div key={index} className="review-card">
                <h3>{r.movie_title}</h3>
                <p>{r.review_text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first!</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
