const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const allUsers = async () => {
  const responsePromise = fetch(`${API_BASE_URL}/api/user/admin/all-users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const sheetsPromise = fetch(
    "https://docs.google.com/spreadsheets/d/1XJYt561AIFlJ60Z6zxYgz7UlOZJfSRTYiLUhbMsYcXg/export?format=csv"
  );

  let [response, sheets] = await Promise.all([responsePromise, sheetsPromise]);

  sheets = await sheets.text();
  sheets = sheets
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(","));

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return { users: responseBody, tasks: sheets };
};

export const verifyTask = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/admin/verify-task`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const userProfile = async () => {
  const responsePromise = fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const sheetsPromise = fetch(
    "https://docs.google.com/spreadsheets/d/1XJYt561AIFlJ60Z6zxYgz7UlOZJfSRTYiLUhbMsYcXg/export?format=csv"
  );

  let [response, sheets] = await Promise.all([responsePromise, sheetsPromise]);

  sheets = await sheets.text();
  sheets = sheets
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(","));

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  responseBody.user.taskList = sheets;

  return responseBody.user;
};

export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const loginUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const addUserTaskURL = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/addUserTask`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateAuthToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error while Logging Out");
  }
};
