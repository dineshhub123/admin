export interface Store {
  id?: number;
  name: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  created_at?: string;
  updated_at?: string;
}