// src/utils/UserData.js

export const setFname = (value) => {
  localStorage.setItem("fname", value);
};

export const getFname = () => {
  return localStorage.getItem("fname") || "";
};

export const setEmail = (value) => {
  localStorage.setItem("email", value);
};

export const getEmail = () => {
  return localStorage.getItem("email") || "";
};

export const clearUserData = () => {
  localStorage.removeItem("fname");
  localStorage.removeItem("email");
};
