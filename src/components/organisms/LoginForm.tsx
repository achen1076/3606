import React, { useState } from 'react';
import Button from '../atoms/button.tsx';
import Label from '../atoms/label.tsx';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error, isLoading = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="bg-black/30 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Kingdom Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="block mb-2">Username</Label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="block mb-2">Password</Label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm py-2">{error}</div>
        )}
        
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
