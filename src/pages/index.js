import React, { useEffect, useState, useRef } from "react";
import "../styles/home.scss";
import sampleData from "../utils/sampleData";
import Item, { MediaItem } from "../components/Item";

// another example https://codedaily.io/tutorials/60/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = e => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default () => {
  const { x, y } = useMousePosition();
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="page-wrapper">
      <div className="project-list">
        {[...sampleData].map(({ title, mediaUrl, mediaType }, index) => (
          <Item
            key={index}
            title={title}
            index={index}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
      <div className="project-media">
        {sampleData.map(({ mediaUrl, mediaType }, index) => {
          const isActive = index === activeIndex;
          const xPos = isActive ? x : 0;
          const yPos = isActive ? y : 0;
          return (
            <>
              <MediaItem url={mediaUrl} x={xPos} y={yPos} active={isActive} />
            </>
          );
        })}
      </div>
    </div>
  );
};
