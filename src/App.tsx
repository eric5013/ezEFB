import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { supabase } from '@/lib/supabase';
import { AuthGuard } from '@/features/auth/AuthGuard';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { useEfbStore } from '@/app/store/efbStore';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* 登录页 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 主应用（受保护） */}
            <Route
              path="/"
              element={
                <AuthGuard>
                  <DashboardLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Navigate to="/plans" replace />} />
              <Route path="plans" element={<FlightPlanPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

/* =========================
   飞行计划主页面
========================= */
import { MapView } from '@/features/flight-plan/MapView';
import { WaypointList } from '@/features/flight-plan/WaypointList';
import { NotesPanel } from '@/features/notes/NotesPanel';
import { TopBar } from '@/features/ui/TopBar';
import { EfbButton } from '@/features/ui/EfbButton';

function FlightPlanPage() {
  const {
    plans,
    currentPlan,
    selectPlan,
    createPlan,
    updateWaypointNotes,
  } = useEfbStore();

  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number>(0);

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-900 text-white overflow-hidden">
      {/* 顶部栏 */}
      <TopBar />

      {/* 主体 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧：飞行计划列表 */}
        <aside className="w-80 bg-neutral-800 border-r border-neutral-700 flex flex-col">
          <div className="p-4 border-b border-neutral-700">
            <select
              className="w-full bg-neutral-700 rounded-xl px-4 py-3 text-lg"
              value={currentPlan?.id}
              onChange={(e) => selectPlan(e.target.value)}
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.plan_name}
                </option>
              ))}
            </select>

            <EfbButton
              className="mt-4 w-full"
              onClick={() => {
                const name = prompt('新飞行计划名称');
                if (name) createPlan(name);
              }}
            >
              ➕ 新建计划
            </EfbButton>
          </div>

          {currentPlan && (
            <WaypointList
              waypoints={currentPlan.route_data}
              selectedIndex={selectedWaypointIndex}
              onSelect={setSelectedWaypointIndex}
            />
          )}
        </aside>

        {/* 中间：地图 */}
        <main className="flex-1 relative">
          {currentPlan && (
            <MapView
              waypoints={currentPlan.route_data}
              selectedIndex={selectedWaypointIndex}
              onSelect={setSelectedWaypointIndex}
            />
          )}
        </main>

        {/* 右侧：笔记 */}
        <aside className="w-96 bg-neutral-800 border-l border-neutral-700">
          {currentPlan && (
            <NotesPanel
              waypoint={currentPlan.route_data[selectedWaypointIndex]}
              onChange={(notes, images) => {
                updateWaypointNotes(
                  currentPlan.id,
                  selectedWaypointIndex,
                  notes,
                  images
                );
              }}
            />
          )}
        </aside>
      </div>
    </div>
  );
}