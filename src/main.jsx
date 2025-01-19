import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Spinner from "../src/pages/Spinner";
import App from "./App";
import { StrictMode } from "react";
import "./index.css";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner loading={loading} progressStage="Loadinggg..." />;
  }

  return <App />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
