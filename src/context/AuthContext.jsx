import { createContext, useState } from "react";
import { users } from "../data/AuthDatas";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (login, password) => {
    const foundUser = users.find(
      (u) => u.login === login && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Login yoki parol noto‘g‘ri" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
