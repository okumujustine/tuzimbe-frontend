export interface SearchMaterial {
    name: string
}


type Measurements = {
    "id": number,
    "name": string,
    "created_at": string
}


export type Materials = {
    "id": number,
    "mesurements": Measurements[],
    "name": string,
    "created_at": string
};