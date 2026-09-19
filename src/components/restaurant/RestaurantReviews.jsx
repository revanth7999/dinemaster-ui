import React, { useState, useEffect } from "react";
import apiClient from "../utils/axiosUtil";
import { useSelector } from "react-redux";

const RestaurantReviews = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchReviews();
  }, [restaurantId]);

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/restaurant/${restaurantId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.post("/reviews", { restaurantId, rating, comment });
      setComment("");
      setRating(5);
      fetchReviews();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "24px", borderTop: "1px solid #eee", paddingTop: "24px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#1e293b" }}>
        Customer Reviews
      </h3>

      {/* Review Form */}
      {user && (
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px", color: "#1e293b" }}>
            Leave a Review
          </h4>
          <form onSubmit={handleSubmitReview}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#64748b" }}>Rating:</span>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: rating >= num ? "#fbbf24" : "#d1d5db",
                    userSelect: "none",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "8px",
                marginBottom: "12px",
                fontSize: "14px",
                minHeight: "80px",
              }}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#4f46e5",
                color: "white",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {isSubmitting ? "Submitting..." : "Post Review"}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {reviews.length === 0 ? (
          <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center" }}>
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: "12px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                  {review.username}
                </span>
                <div style={{ color: "#fbbf24", fontSize: "12px" }}>
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#4b5563", margin: 0 }}>
                {review.comment}
              </p>
              <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantReviews;
