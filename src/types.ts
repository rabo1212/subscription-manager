export interface Subscription {
  id: string;
  user_id: string | null;
  name: string;
  plan: string | null;
  price: number;
  billing_day: number;
  is_custom: boolean;
  is_trial: boolean;
  trial_end_date: string | null;
  created_at: string;
  usage_status: 'using' | 'not_using' | null;
  downgrade_needed: boolean | null;
}

export type SubscriptionInsert = Omit<Subscription, 'id' | 'created_at'>;
export type SubscriptionUpdate = Partial<SubscriptionInsert>;
