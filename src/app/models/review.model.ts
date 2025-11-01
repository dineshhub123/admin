export interface Review {
  id?: number;
  product_id: number;
  customer_name: string;
  rating: number;
  review_text?: string;
  created_at?: string;
}