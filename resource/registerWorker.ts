import { parseError } from '../helpers/utils';
import { AddWorkerParams, Workers } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export async function addWorker(workerParams: AddWorkerParams): Promise<string | Workers> {
    console.log(workerParams)
    try {
        const resp = await tuzimbeApi.post('/worker/add/', { ...workerParams });
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

