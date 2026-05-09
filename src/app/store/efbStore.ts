import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

type Waypoint = {
  id: string;
  lat: number;
  lon: number;
  type: string;
  notes?: string;
  images?: string[];
};

type FlightPlan = {
  id: string;
  plan_key: string;
  plan_name: string;
  route_data: Waypoint[];
};

type State = {
  plans: FlightPlan[];
  currentPlan: FlightPlan | null;
  selectPlan: (id: string) => void;
  createPlan: (name: string) => Promise<void>;
  updateWaypointNotes: (
    planId: string,
    index: number,
    notes: string,
    images: string[]
  ) => void;
};

export const useEfbStore = create<State>((set, get) => ({
  plans: [],
  currentPlan: null,

  selectPlan: (id) => {
    const plan = get().plans.find((p) => p.id === id) || null;
    set({ currentPlan: plan });
  },

  createPlan: async (name) => {
    const { data } = await supabase.auth.getUser();
    const { data: plan } = await supabase
      .from('flight_plans')
      .insert({
        user_id: data.user?.id,
        plan_name: name,
        plan_key: name,
        route_data: [],
      })
      .select()
      .single();

    set((state) => ({
      plans: [...state.plans, plan],
      currentPlan: plan,
    }));
  },

  updateWaypointNotes: (planId, index, notes, images) => {
    set((state) => {
      const plans = state.plans.map((p) =>
        p.id === planId
          ? {
              ...p,
              route_data: p.route_data.map((w, i) =>
                i === index ? { ...w, notes, images } : w
              ),
            }
          : p
      );
      return {
        plans,
        currentPlan: plans.find((p) => p.id === planId) || null,
      };
    });
  },
}));