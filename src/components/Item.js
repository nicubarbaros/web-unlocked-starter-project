import React, { useLayoutEffect, useCallback, useState } from "react";

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

function useDimensions(remeasure) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => setDimensions(getDimensionObject(node));
      measure();
    }
  }, [node, remeasure]);

  return [ref, dimensions, node];
}

export const MediaItem = ({ url, x, y, active }) => {
  const [ref, { width, height }] = useDimensions();
  return (
    <img
      className={active && "is-active"}
      ref={ref}
      src={url}
      style={{
        transform: `translate(${x - width / 2}px,${y - height / 2}px)`,
      }}
    />
  );
};

const Item = ({ title, setActiveIndex, index }) => (
  <div
    className="project-item"
    onMouseEnter={() => setActiveIndex(index)}
    onMouseLeave={() => setActiveIndex(-1)}
  >
    <h3 className="project-title">
      <span>{title}</span>
    </h3>
  </div>
);

export default Item;
