export type DailyMaterialUsageFilterParams = {
    added_date: string
}

export type AddMaterialUsageParams = {
    measurement_method: number,
    material: number,
    quantity: number,
    price: number
}

export type AddMaterialParams = {
    measurement_method: number,
    name: string
}

export type MeasurementMethod = {
    id: number,
    name: string,
    created_at: string

}


export type Materials = {
    "id": number,
    "mesurements": MeasurementMethod[],
    "name": string,
    "created_at": string
};

export type MaterialUsage = {
    "id": number,
    "measurement_method": MeasurementMethod,
    "material": Materials,
    "quantity": number,
    "price": number,
    "price_currency": string,
    "created_at": string
}