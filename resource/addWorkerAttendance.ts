import { parseError } from '../helpers/utils';
import {
    WorkerAttendance,
    AddWorkerAttendanceParams,
} from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export async function addWorkersAttendance(
    params: AddWorkerAttendanceParams
): Promise<string | WorkerAttendance[]> {
    try {
        const resp = await tuzimbeApi.post("/worker/add_daily_worker/", {
            ...params
        });
        return resp.data;
    } catch (error) {
        console.log(error);
        return parseError(error)
    }
}

