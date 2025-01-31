const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
import * as XLSX from "xlsx";
import { publicGeneralSheet } from "../public/sheet";

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

export const refreshLeaderboard = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/user/admin/refreshLeaderboard`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getLeaderboard = async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/temp-waterbottle/database/aavhan/leaderboard/leaderboard.json`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  console.log(responseBody);
  return responseBody;
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

export const getOtp = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/mail/getOtp`, {
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

export const getSheet = async (sheetUrl) => {
  try {
    let response = await fetch(sheetUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch the spreadsheet");
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetsData = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 0 });

      sheetsData[sheetName] = sheetData;
    });

    console.log(sheetsData);

    return sheetsData;
  } catch (error) {
    console.error("Error fetching or processing the spreadsheet:", error);
    throw error;
  }
};

export const getGeneralSheet = async () => {
  try {
    const sheet = await getSheet(
      "https://docs.google.com/spreadsheets/d/1fibIy-Ts1g5DCO6ETFEN40c7HSj456y04wFdpUvlGJI/export?format=xlsx"
    );
    // const sheet = publicGeneralSheet;
    return sheet;
  } catch (error) {
    return "ERROR";
  }
};
