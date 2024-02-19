import type {
  User,
  ReportWithUserData,
  Report,
  CommentWithUserData,
} from "@/lib/types";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
  storeAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

// Centralize handling of user auth token errors for CRUD operations
const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};

// Register a new user
export const register = async (
  jhed: string,
  password: string,
  name: string,
  classYear: string,
  teamName: string,
  position: string,
  isChief: boolean,
  avatarUrl?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jhed,
      password,
      name,
      classYear,
      teamName,
      position,
      isChief,
      avatarUrl,
    }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText}`,
    );
  }
};

// Login, store the token, and return the user
export const login = async (jhed: string, password: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jhed, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText}`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  // You can send a request to the server to perform server-side logout
  // Here we just clear the token
  removeAuthenticatedUserToken();
};

// Fetch a report given its id
export const fetchReportById = async (
  id: string,
): Promise<ReportWithUserData> => {
  const response = await fetch(`${API_URL}/reports/${id}?withUserData=true`);
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Fetch all reports with user data
export const fetchReports = async (): Promise<ReportWithUserData[]> => {
  const response = await fetch(`${API_URL}/reports?withUserData=true`);
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Create a report
export const createReport = async (
  title: string,
  description: string,
  url: string,
): Promise<Report> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, url }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// Delete report by id
export const deleteReport = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Fetch all comments for a report
export const fetchComments = async (
  reportId: string,
): Promise<CommentWithUserData[]> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(
    `${API_URL}/reports/${reportId}/comments?withUserData=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Create a new comment
export const createComment = async (
  reportId: string,
  content: string,
): Promise<CommentWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/reports/${reportId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user,
  };
};
