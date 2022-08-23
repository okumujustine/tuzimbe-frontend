import { parseError } from '../helpers/utils';
import { Workers } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export const getWorkers: () => Promise<string | Workers[]> = async () => {
    try {
        const resp = await tuzimbeApi.get('/worker/all/');
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
