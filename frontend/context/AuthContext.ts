"use client";
import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { AuthContextValue, User, Session, SignUp } from "@/lib/types";

const context = createContext<AuthContextValue | null>(null);
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      }
      return {
        success: true,
        message: "signup successfull",
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
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/signin`,
        { walletaddr: walletAddress },
      );
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
