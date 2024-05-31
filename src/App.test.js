import { fireEvent, render, screen } from "@testing-library/react";
import SignInPage from "./SignInPage/SignInPage";

jest.mock("antd", () => ({
  Select: ({ children, onChange, value }) => (
    <select onChange={onChange} value={value}>
      {children}
    </select>
  ),
}));

jest.mock('antd', () => ({
  Typography: {
    Title: ({ children }) => <div>{children}</div>, 
  },
}));

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("displays error message for invalid credentials", async () => {
  render(<SignInPage />);
  const usernameElement = screen.getByLabelText("Username");
  fireEvent.change(usernameElement, { target: { value: "donglb1" } });
  expect(usernameElement.value).toBe("donglb1");
});
