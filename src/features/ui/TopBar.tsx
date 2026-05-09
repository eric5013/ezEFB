import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export const TopBar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="h-14 bg-neutral-800 border-b border-neutral-700 flex items-center px-4 justify-between">
      <span className="font-bold text-xl">EFB 飞行简报系统</span>
      <button onClick={logout} className="text-red-400">
        退出登录
      </button>
    </div>
  );
};