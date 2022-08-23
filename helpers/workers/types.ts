export type Workers = {
    id: number;
    first_name: string;
    last_name: string;
    main_daily_rate: number,
    main_rate_currency: string,
    created_at: string
};

export type GetWorkersResponse = {
    data: Workers[];
};