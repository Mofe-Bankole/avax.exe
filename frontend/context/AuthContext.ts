import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { AuthContextValue, User, Session } from "@/lib/types";

const context = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async (walletAddress: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/api/v1/auth/internal/signup`,
        { walletAddress },
      );
      const { data } = response;
      setSession(data.session);
      setUser(data.user);
      console.log("SIGNUP SUCCESSFULL");
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (walletAddress: string): Promise<Session> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/api/login`,
        { walletAddress },
      );
      const { data } = response;
      setSession(data.session);
      setUser(data.user);
      const newSession: Session = data.session;
      return newSession;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/api/logout`,
      );
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      signUp,
      signIn,
      signOut,
    }),
    [session, user, loading, logout],
  );

  return React.createElement(context.Provider, { value }, children);
}

/**
 * useAuth hook for accessing AuthContext
 */
export function useAuth() {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
