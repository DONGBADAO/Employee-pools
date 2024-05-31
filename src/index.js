import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import store from "./reducers/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
