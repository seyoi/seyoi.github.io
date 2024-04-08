"use client";
import { useProduct } from "@/app/contexts/ProductContext";
import "./style.css";
import { useEffect, useState } from "react";

export default function StarRating({ noOfStar = 5 }) {
  const { rate, setRate } = useProduct();
  const [hover, setHover] = useState(0);

  useEffect(() => {
    console.log(hover);
  }, [hover]);
  const handleMouseOver = (index) => {
    setHover(index + 1);
  };

  const handleMouseOut = () => {
    setHover(0);
  };

  const handleClick = (index) => {
    setRate(index + 1);
  };

  return (
    <div className="wrapper">
      <div className="stars" style={{ display: "flex" }}>
        {Array(noOfStar)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={index < (hover || rate) ? "active" : "inactive"}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut()}
              onClick={() => handleClick(index)}
              style={{
                width: "1rem",
                height: "1rem",
                border: "1px solid black",
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}
