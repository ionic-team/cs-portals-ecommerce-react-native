import React from "react";
import { CSSTransition } from "react-transition-group";
import "./FadeIn.css";

export const FadeIn: React.FC<{ isLoaded: boolean }> = ({
  isLoaded,
  children,
}) => (
  <CSSTransition in={isLoaded} timeout={500} classNames="fade-in">
    {children}
  </CSSTransition>
);
