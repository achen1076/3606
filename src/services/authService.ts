// Simple secure authentication service
// In a production environment, this would connect to a backend API

interface User {
  id: string;
  username: string;
  role: 'admin' | 'member';
  displayName: string;
}

// In a real app, this would be handled by a backend
// This is just for demonstration purposes
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin': {
    password: 'kingdom3606', // In real app, passwords would be hashed and stored securely
    user: {
      id: '1',
      username: 'admin',
      role: 'admin',
      displayName: 'Kingdom Admin'
    }
  },
  'member': {
    password: 'member3606',
    user: {
      id: '2',
      username: 'member',
      role: 'member',
      displayName: 'Kingdom Member'
    }
  }
};

// Token storage key
const TOKEN_KEY = 'kingdom_3606_auth_token';
const USER_KEY = 'kingdom_3606_user';

// Simulated token generation
const generateToken = (user: User): string => {
  // In a real app, this would be a JWT token
  return btoa(JSON.stringify({
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours expiration
  }));
};

export const login = async (username: string, password: string): Promise<User> => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userRecord = MOCK_USERS[username.toLowerCase()];
      
      if (!userRecord || userRecord.password !== password) {
        reject(new Error('Invalid username or password'));
        return;
      }
      
      const token = generateToken(userRecord.user);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userRecord.user));
      
      resolve(userRecord.user);
    }, 800); // Simulate network delay
  });
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    const decoded = JSON.parse(atob(token));
    // Check if token is expired
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
