import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("userToken") || null
  );

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://tango-hotel-backend.onrender.com";

  const fetchUserProfile = async (jwt: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user profile");
      const data = await res.json();
      setUser(data.user || data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      logout();
    }
  };

  const login = async (jwt: string) => {
    localStorage.setItem("userToken", jwt);
    setToken(jwt);
    await fetchUserProfile(jwt);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setToken(null);
  };

  const refreshUser = async () => {
    if (token) await fetchUserProfile(token);
  };

  useEffect(() => {
    if (token) fetchUserProfile(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
