import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { QUESTIONS_PAGE } from "./constant";

jest.mock("./QuestionsPage/QuestionsPage", () => () => (
  <div>Questions Page</div>
));
jest.mock("./SignInPage/SignInPage", () => () => <div>Sign In Page</div>);
jest.mock("./SignUpPage/SignUpPage", () => () => <div>Sign Up Page</div>);

describe("App", () => {
  const mockSessionStorage = (isAuthenticated) => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => (isAuthenticated ? "sessionLogin" : null)),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders QuestionsPage when authenticated", async () => {
    mockSessionStorage(true);
    render(
      <MemoryRouter initialEntries={[QUESTIONS_PAGE]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => screen.findByText("Questions Page"));
    expect(screen.getByText("Questions Page")).toBeInTheDocument();
  });

  it("redirects to SignInPage when not authenticated", async () => {
    mockSessionStorage(false);
    render(
      <MemoryRouter initialEntries={[QUESTIONS_PAGE]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => screen.findByText("Sign In Page"));
    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });
});
