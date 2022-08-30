import { DailyMaterialUsageFilterParams, MaterialUsage } from '../helpers/materials/types';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export async function getMaterialUsage(
    filter: DailyMaterialUsageFilterParams
): Promise<string | MaterialUsage[]> {
    try {
        const resp = await tuzimbeApi.get(`/material/material_usage?added_date__iexact=${filter.added_date}`);
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

