export type OccasionReq = {
  name: string;
  description: string;
  image?: string;
  start_at: string;
  end_at: string;
  is_lunar_date: boolean;
};

export type OccasionReqPut = {
  id: number;
  name: string;
  description: string;
  image?: string;
  start_at: string;
  end_at: string;
  is_lunar_date: boolean;
};
