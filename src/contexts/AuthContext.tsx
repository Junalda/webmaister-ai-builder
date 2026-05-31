import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';
import { mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with supabase.auth.getSession()
    const stored = localStorage.getItem('wm_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, _password: string) {
    setIsLoading(true);
    // TODO: Replace with supabase.auth.signInWithPassword({ email, password })
    await new Promise(r => setTimeout(r, 800));
    const authed = { ...mockUser, email };
    setUser(authed);
    localStorage.setItem('wm_user', JSON.stringify(authed));
    setIsLoading(false);
  }

  async function signup(email: string, _password: string, name: string) {
    setIsLoading(true);
    // TODO: Replace with supabase.auth.signUp({ email, password }) + insert into users table
    await new Promise(r => setTimeout(r, 800));
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      plan: 'free',
      credits: 10,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('wm_user', JSON.stringify(newUser));
    setIsLoading(false);
  }

  function logout() {
    // TODO: Replace with supabase.auth.signOut()
    setUser(null);
    localStorage.removeItem('wm_user');
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
