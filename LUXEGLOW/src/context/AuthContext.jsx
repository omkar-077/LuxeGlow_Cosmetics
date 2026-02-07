import { createContext, useState, useEffect, useCallback } from "react";
import { generateId } from "@/utils/helpers";

export const AuthContext = createContext(null);

const USERS_KEY = "luxeglow_users";
const SESSION_KEY = "luxeglow_session";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const getStoredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const login = useCallback(async (email, password) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }

    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
    };

    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const users = getStoredUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const updateProfile = useCallback(
    (name) => {
      if (!user) return;

      const updated = { ...user, name };
      setUser(updated);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === user.id);

      if (idx !== -1) {
        users[idx].name = name;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
