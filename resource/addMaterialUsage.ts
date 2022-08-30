import { AddMaterialUsageParams, DailyMaterialUsageFilterParams, MaterialUsage } from '../helpers/materials/types';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export async function addMaterialUsage(
    params: AddMaterialUsageParams
): Promise<string | MaterialUsage> {
    try {
        const resp = await tuzimbeApi.post(`/material/add_usage/`, {
            ...params
        });
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

