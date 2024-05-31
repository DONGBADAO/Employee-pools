const api = "https://6651fd7220f4f4c4427965bc.mockapi.io/api/employee-polls";
const headers = { "content-type": "application/json" };

export const getAllUser = () => {
  try {
    return fetch(`${api}/users`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("getAllUser - Error fetching data:", error);
  }
};

export const getUserInfo = (userId) => {
  try {
    return fetch(`${api}/users/${userId}`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("getUserInfo - Error fetching data:", error);
  }
};

export const updateUserInfo = (data) => {
  try {
    return fetch(`${api}/users/${data.userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ questions: data.questions }),
    })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("updateUserInfo - Error fetching data:", error);
  }
};

export const changePassword = (data) => {
  try {
    return fetch(`${api}/users/${data.userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ password: data.password }),
    })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("changePassword - Error fetching data:", error);
  }
};

export const registerUser = (data) => {
  try {
    return fetch(`${api}/users`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.error("registerUser - Error add data:", error);
  }
};

export const getAllQuestion = () => {
  try {
    return fetch(`${api}/questions`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("getAllQuestion - Error fetching data:", error);
  }
};

export const getQuestion = (questionId) => {
  try {
    return fetch(`${api}/questions/${questionId}`, { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("getQuestion - Error fetching data:", error);
  }
};

export const addNewQuestion = (data) => {
  try {
    return fetch(`${api}/questions`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("addNewQuestion - Error fetching data:", error);
  }
};

export const updateQuestionStatus = (data) => {
  try {
    return fetch(`${api}/questions/${data.questionId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data.vote),
    })
      .then((res) => res.json())
      .then((data) => data);
  } catch (error) {
    console.error("updateQuestion - Error fetching data:", error);
  }
};
