// materialsUsageStats

import { parseError } from '../helpers/utils';
import { MaterialsUsageStatsResp, Workers } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


// http://127.0.0.1:8002/material/material_usage_filter/?start_date=2022-08-30&end_date=2022-08-30


type Params = {
    start_date?: string,
    end_date?: string
}

function getUrl(params: Params) {
    if (params && params.start_date && params.end_date) {
        return `/material/material_usage_filter/?start_date=${params.start_date}&end_date=${params.end_date}`
    } else {
        return "/material/material_usage_filter/"
    }
}

export async function materialsUsageStats(
    params: Params
): Promise<string | MaterialsUsageStatsResp[]> {
    const url = getUrl(params)
    try {
        const resp = await tuzimbeApi.get(url);
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

