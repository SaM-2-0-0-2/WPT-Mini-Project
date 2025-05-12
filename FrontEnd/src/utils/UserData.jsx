// src/utils/UserData.js

export const setFname = (value) => {
  localStorage.setItem("fname", value);
};

export const setAdminName = (value) => {
  localStorage.setItem("adminname", value);
}

export const getAdminName = () => {
  return localStorage.getItem("adminname") || "";
};

export const setAdminEmail = (value) => {
  localStorage.setItem("adminEmail", value);
}

export const getAdminEmail = () => {
  return localStorage.getItem("adminEmail") || "";
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

export const clearAdminData = () => {
  localStorage.removeItem("adminname");
  localStorage.removeItem("adminEmail");
};
