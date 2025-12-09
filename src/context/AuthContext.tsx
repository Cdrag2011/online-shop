import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import type { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export type UserRole = "admin" | "user";

export interface AppUser {
  uid: string;
  email: string | null;
  role: UserRole;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserRole = async (fbUser: FirebaseUser): Promise<UserRole> => {
    try {
      const ref = doc(db, "users", fbUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return (snap.data().role as UserRole) || "user";
      }
    } catch (e) {
      console.error("Eroare la citirea rolului:", e);
    }
    return "user";
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const role = await getUserRole(fbUser);
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const register = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      role: "user",
      createdAt: serverTimestamp(),
    });

    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      role: "user",
    });
  };

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const role = await getUserRole(cred.user);

    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      role,
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const ctx: AuthContextValue = {
    user,
    loading,
    register,
    login,
    logout,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={ctx}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
