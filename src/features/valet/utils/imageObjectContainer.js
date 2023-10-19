import React, { createContext, useState } from "react";

export const ImageContainerContext = createContext();

export const ImageContainerProvider = ({ children }) => {
  const [front, setFront] = useState({});
  const [back, setBack] = useState({});
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  const clearfront = () => {
    setFront({});
  };

  const clearback = () => {
    setBack({});
  };

  const clearleft = () => {
    setLeft({});
  };

  const clearright = () => {
    setRight({});
  };

  const clearall = () => {
    setFront({});
    setBack({});
    setLeft({});
    setRight({});
  };

  return (
    <ImageContainerContext.Provider
      value={{
        front,
        setFront,
        clearfront,
        back,
        setBack,
        clearback,
        left,
        setLeft,
        clearleft,
        right,
        setRight,
        clearright,
        clearall,
      }}
    >
      {children}
    </ImageContainerContext.Provider>
  );
};
