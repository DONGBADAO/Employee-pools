import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AddQuestionPage from "./AddQuestionPage";
import * as questionsActions from "../reducers/questions/questions.actions";
import * as userActions from "../reducers/users/user.actions";
import { ADD_QUESTION_PAGE, QUESTIONS_PAGE } from "../constant";
import { message } from "antd";
import * as ReactRedux from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../reducers/questions/questions.actions", () => ({
  addQuestion: jest.fn(() => Promise.resolve(true)),
  resetAddQuestionData: jest.fn(),
}));

jest.mock("../reducers/users/user.actions", () => ({
  clearError: jest.fn(),
  updateMemberInfo: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("../utils/string", () => ({
  generateUID: () => "mocked-uid",
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("antd/lib/form/FormItem", () => ({
  __esModule: true,
  default: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

jest.mock("../Header/Header", () => ({
  __esModule: true,
  default: () => <div>Mock Header</div>,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("AddQuestionPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      questionsState: {
        questions: [],
        loading: false,
        error: null,
        addQuestionInfo: null,
      },
      usersState: {
        userInfo: {
          id: "user1",
          userId: "user1",
          questions: ["q1"],
        },
      },
    });

    Storage.prototype.getItem = jest.fn(
      () =>
        '{"id": "user1","userId": "user 1","questions": "[]", "name": "Test User", "avatarURL": "avatar.png"}'
    );
    Storage.prototype.removeItem = jest.fn();

    jest.spyOn(message, "error").mockImplementation(() => {});

    jest
      .spyOn(ReactRedux, "useSelector")
      .mockImplementation((selector) => selector(store.getState()));

    jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the AddQuestionPage component correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ADD_QUESTION_PAGE]}>
          <AddQuestionPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Would You Rather")).toBeInTheDocument();
    expect(screen.getByText("Create Your Own Poll")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole("textbox")).toHaveLength(2);
    });

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("submits the form and dispatches addQuestion", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ADD_QUESTION_PAGE]}>
          <AddQuestionPage />
        </MemoryRouter>
      </Provider>
    );

    const textAreas = screen.getAllByRole("textbox");
    const firstOptionTextArea = textAreas[0];
    const secondOptionTextArea = textAreas[1];
    fireEvent.change(firstOptionTextArea, { target: { value: "Option 1" } });
    fireEvent.change(secondOptionTextArea, { target: { value: "Option 2" } });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(questionsActions.addQuestion).toHaveBeenCalled();
    });
  });
});
