import React, { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("skiez_admin_token"));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("skiez_admin_info");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("skiez_admin_token", data.token);
    localStorage.setItem("skiez_admin_info", JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("skiez_admin_token");
    localStorage.removeItem("skiez_admin_info");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
