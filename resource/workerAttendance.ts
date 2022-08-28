import { parseError } from '../helpers/utils';
import {
    WorkerAttendanceFilterParams,
    WorkerAttendance,
} from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export async function workersAttendance(
    filter: WorkerAttendanceFilterParams
): Promise<string | WorkerAttendance[]> {
    try {
        const resp = await tuzimbeApi.get(`worker/attendance/?added_date__iexact=${filter.added_date}`);
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

