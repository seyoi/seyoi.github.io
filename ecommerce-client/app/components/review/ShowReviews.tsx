"use client";
import React, { useEffect } from "react";
import { useProduct } from "@/app/contexts/ProductContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";

function ShowReviews({ slug }) {
  const { reviews, setReviews } = useProduct();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const reviewsCollection = collection(doc.ref, "reviews");
          const reviewsSnapshot = await getDocs(reviewsCollection);
          const fetchedReviews = [];
          reviewsSnapshot.forEach((reviewDoc) => {
            fetchedReviews.push({ id: reviewDoc.id, ...reviewDoc.data() });
          });

          setReviews(fetchedReviews);
        });
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.title}</h3>
            <p>{review.content}</p>
            <p>Rating: {review.rate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowReviews;
