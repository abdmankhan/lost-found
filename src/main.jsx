import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignUp,
} from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import Spinner from "../src/pages/Spinner";
import App from "./App";
import { StrictMode } from "react";
import "./index.css";

const clerkFrontendApi =
  "pk_test_aGVscGluZy1lbGVwaGFudC03Ny5jbGVyay5hY2NvdW50cy5kZXYk";

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
    return <Spinner loading={loading} progressStage="Loading..." />;
  }

  return (
    // <ClerkProvider publishableKey={clerkFrontendApi}>
    //   <SignedIn>
    <App />
    /*{ </SignedIn>
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </ClerkProvider> }*/
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
