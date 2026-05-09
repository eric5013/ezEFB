export interface Waypoint {
  id: string;
  lat: number;
  lon: number;
  type: string;
  notes?: string;
  images?: string[];
}

export interface FlightPlan {
  id: string;
  plan_key: string;
  plan_name: string;
  route_data: Waypoint[];
}