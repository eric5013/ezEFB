import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded-xl w-80">
        <h2 className="text-white text-xl mb-4">登录 EFB</h2>
        <input
          className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-sky-600 text-white py-2 rounded"
        >
          登录
        </button>
      </div>
    </div>
  );
};