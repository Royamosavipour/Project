import React, { useEffect, useState } from "react";

export default function LandingCounter({ count }) {
  const [coursCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCourseCounter((prevCount) => prevCount + 1);
    }, 2);
    if (coursCounter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [coursCounter]);

  return (
    <div>
      <span className="landing-status__count">{coursCounter}</span>
    </div>
  );
}
