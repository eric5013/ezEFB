// src/features/dashboard/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/features/ui/TopBar';

export const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white">
      <TopBar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};