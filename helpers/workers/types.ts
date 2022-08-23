export type Workers = {
    id: number;
    email: string;
    first_name: string;
};

export type GetWorkersResponse = {
    data: Workers[];
};