export type Workers = {
    id: number;
    first_name: string;
    last_name: string;
    main_daily_rate: number,
    main_rate_currency: string,
    created_at: string
};

export type AddWorkerParams = {
    first_name: string;
    last_name: string;
    main_daily_rate: number,
}

export type GetWorkersResponse = {
    data: Workers[];
};

export type WorkerAttendance = {
    id: number,
    worker: Workers,
    arrival_time: string,
    departure_time: string,
    daily_rate: number,
    daily_rate_currency: string,
    added_date: string,
    created_at: string
}

export type WorkerAttendanceFilterParams = {
    added_date: string
}