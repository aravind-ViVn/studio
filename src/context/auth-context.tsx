"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SystemUser } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: SystemUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<SystemUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: SystemUser[] = [
  {
    id: 'u1',
    name: 'Jane Doe',
    email: 'admin@libraflow.com',
    role: 'Super Admin',
    status: 'Active',
    joinDate: 'Oct 2024'
  },
  {
    id: 'u2',
    name: 'John Smith',
    email: 'librarian@libraflow.com',
    role: 'Librarian',
    status: 'Active',
    joinDate: 'Nov 2024'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SystemUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = localStorage.getItem('libra_session');
    if (session) {
      setUser(JSON.parse(session));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(u => u.email === email && password === 'Password123');

    if (foundUser) {
      if (foundUser.status === 'Inactive') {
        toast({
          variant: "destructive",
          title: "Account Disabled",
          description: "Your account has been deactivated. Please contact support."
        });
        setIsLoading(false);
        return false;
      }

      setUser(foundUser);
      if (rememberMe) {
        localStorage.setItem('libra_session', JSON.stringify(foundUser));
      }
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.role}`
      });
      router.push('/dashboard');
      setIsLoading(false);
      return true;
    }

    toast({
      variant: "destructive",
      title: "Authentication Failed",
      description: "Invalid credentials. Try admin@libraflow.com / Password123"
    });
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libra_session');
    toast({
      title: "Logged out",
      description: "You have been securely signed out."
    });
    router.push('/');
  };

  const updateProfile = (data: Partial<SystemUser>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      if (localStorage.getItem('libra_session')) {
        localStorage.setItem('libra_session', JSON.stringify(updated));
      }
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
