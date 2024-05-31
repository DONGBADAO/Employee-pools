import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Error</h1>
      <h2>An error occurred</h2>
      <p>A system error occurred, please try again later</p>
    </div>
  );
};

export default ErrorPage;
