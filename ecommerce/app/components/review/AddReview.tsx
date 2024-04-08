"use client"; // AddReview 컴포넌트
import React from "react";
import StarRating from "@/app/components/rate/Rate";
import { useProduct } from "@/app/contexts/ProductContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "@/app/(front)/my-page/FirebaseAppConfig";

function AddReview({ slug }) {
  const {
    setReviews,
    rate,
    reviewTitle,
    reviewContent,
    setRate,
    setReviewTitle,
    setReviewContent,
  } = useProduct();

  const handleReviewSubmit = async () => {
    try {
      const user = auth.currentUser;
      const userId = user?.uid;

      const reviewData = {
        title: reviewTitle,
        content: reviewContent,
        rate,
        userId: userId,
        createdAt: serverTimestamp(),
      };

      // 해당 제품의 리뷰를 추가하기 위해 slug를 이용하여 제품을 찾습니다.
      const q = query(collection(db, "products"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const productId = doc.id;
        await addDoc(
          collection(db, "products", productId, "reviews"),
          reviewData
        );
        setReviews((prevReviews) => [...prevReviews, reviewData]);
        setReviewTitle("");
        setReviewContent("");
        setRate(0);
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div>
      <h3>Write a Review</h3>
      <label htmlFor="reviewTitle">Title:</label>
      <input
        id="reviewTitle"
        type="text"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
      />
      <label htmlFor="reviewContent">Content:</label>
      <input
        id="reviewContent"
        type="text"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />
      <label htmlFor="rate">Rate:</label>
      <StarRating setRate={setRate} />
      <button onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
}
export default AddReview;
