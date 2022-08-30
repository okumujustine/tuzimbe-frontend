import { parseError } from '../helpers/utils';
import { setDepartureTimeParams, Workers } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export async function addDepartureTime(
    params: setDepartureTimeParams
): Promise<string | Workers> {
    try {
        const resp = await tuzimbeApi.post('/worker/set_departure_time/', { ...params });
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

