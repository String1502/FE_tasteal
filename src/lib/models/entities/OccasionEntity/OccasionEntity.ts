export type OccasionEntity = {
    id: number;
    name: string;
    description: string;
    image?: string;
    start_at: Date;
    end_at: Date;
    is_lunar_date: boolean;
};
