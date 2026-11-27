import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  getDashboardRoute: (role?: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const v = localStorage.getItem('abes_auth_v');
    if (v !== '2.0') {
      localStorage.setItem('abes_auth_v', '2.0');
      localStorage.setItem('abes_current_user', JSON.stringify(DEMO_USERS.super_admin));
      localStorage.setItem('abes_current_role', 'super_admin');
      return DEMO_USERS.super_admin;
    }
    const saved = localStorage.getItem('abes_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS.super_admin;
      }
    }
    return DEMO_USERS.super_admin;
  });

  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('abes_current_role') as UserRole;
    return savedRole || 'super_admin';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('abes_current_user', JSON.stringify(user));
      localStorage.setItem('abes_current_role', user.role);
      setRole(user.role);
    } else {
      localStorage.removeItem('abes_current_user');
      localStorage.removeItem('abes_current_role');
    }
  }, [user]);

  const login = async (email: string, selectedRole?: UserRole): Promise<boolean> => {
    // Artificial slight delay for realistic SaaS loading feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    let matchedRole: UserRole = selectedRole || 'super_admin';
    if (!selectedRole) {
      if (email.includes('hod')) matchedRole = 'hod';
      else if (email.includes('faculty')) matchedRole = 'faculty';
      else if (email.includes('student')) matchedRole = 'student';
      else matchedRole = 'super_admin';
    }

    const targetUser = DEMO_USERS[matchedRole] || DEMO_USERS.super_admin;
    setUser(targetUser);
    setRole(targetUser.role);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    const newUser = DEMO_USERS[newRole];
    if (newUser) {
      setUser(newUser);
      setRole(newRole);
    }
  };

  const getDashboardRoute = (targetRole?: UserRole): string => {
    const r = targetRole || role;
    switch (r) {
      case 'super_admin':
        return '/dashboard/admin';
      case 'hod':
        return '/dashboard/hod';
      case 'faculty':
        return '/dashboard/faculty';
      case 'student':
        return '/dashboard/student';
      default:
        return '/dashboard/admin';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : role,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        getDashboardRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
