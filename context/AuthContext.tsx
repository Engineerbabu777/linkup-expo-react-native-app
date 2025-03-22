import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setAuth: (authUser: any) => void;
  setAuthData: (userData: any) => void;
}

// Create a context with a default undefined value (it will be set in the provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component with strong typing
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (authUser: any) => {
    setUser(authUser);
  };

  const setAuthData = (userData: any) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...userData } : null));
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext safely
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
