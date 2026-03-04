"use client";
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { AuthContextValue, User, Session, SignUp } from "@/lib/types";

const context = createContext<AuthContextValue | null>(null);
export const BACKEND_URL =
  (process.env.NEXT_PUBLIC_BACKEND_URL as string) || "http://localhost:3070";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const STORAGE_SESSION_KEY = "avax_session";
  const STORAGE_USER_KEY = "avax_user";

  // Restore session/user from localStorage on mount so the UI can show the
  // authenticated state after a page refresh.
  useEffect(() => {
    try {
      const rawSession = localStorage.getItem(STORAGE_SESSION_KEY);
      const rawUser = localStorage.getItem(STORAGE_USER_KEY);
      if (rawSession) {
        const parsed = JSON.parse(rawSession) as Session;
        setSession(parsed);
      }
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser) as User;
        setUser(parsedUser);
      }
    } catch (err) {
      // Ignore malformed storage content but log for debugging
      console.error("Failed to restore auth from storage", err);
    }
  }, []);

  const signUp = async (
    params: SignUp,
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/internal/signup`,
        { params },
      );
      const { data } = response;

      if (data?.session && data?.user) {
        const mappedSession: Session = {
          owner: data.session.owner ?? data.user,
          token: data.session.token,
        };
        setSession(mappedSession);
        setUser(mappedSession.owner);
        // Persist session + user for reloads
        try {
          localStorage.setItem(
            STORAGE_SESSION_KEY,
            JSON.stringify(mappedSession),
          );
          localStorage.setItem(
            STORAGE_USER_KEY,
            JSON.stringify(mappedSession.owner),
          );
          // keep legacy jwt_token key for compatibility
          localStorage.setItem("jwt_token", mappedSession.token);
        } catch (err) {
          console.error("Failed to persist auth to storage", err);
        }
      }
      return {
        success: true,
        message: "Signup Successfull",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "signup unsuccessfull",
      };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (walletAddress: string): Promise<Session> => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
        walletaddr: walletAddress,
      });
      const { data } = response;

      if (!data?.session || !data?.data) {
        throw new Error("Invalid signin response from server");
      }

      const mappedSession: Session = {
        owner: data.session.owner ?? data.data,
        token: data.session.token,
      };
      setSession(mappedSession);
      setUser(mappedSession.owner);
      // Persist session + user for reloads
      try {
        localStorage.setItem(
          STORAGE_SESSION_KEY,
          JSON.stringify(mappedSession),
        );
        localStorage.setItem(
          STORAGE_USER_KEY,
          JSON.stringify(mappedSession.owner),
        );
        localStorage.setItem("jwt_token", mappedSession.token);
      } catch (err) {
        console.error("Failed to persist auth to storage", err);
      }

      return mappedSession;
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
      // If/when a logout endpoint exists on the backend, call it here.
      setSession(null);
      setUser(null);
      // Clear persisted auth
      try {
        localStorage.removeItem(STORAGE_SESSION_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
        localStorage.removeItem("jwt_token");
      } catch (err) {
        console.error("Failed to clear auth storage", err);
      }
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
    [session, user, loading, signOut],
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
