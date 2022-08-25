import { parseError } from '../helpers/utils';
import { SearchWorker } from '../helpers/workers/interface';
import { Workers } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export const searchWorkers: (params: SearchWorker) => Promise<string | Workers[]> = async (
    { name }: SearchWorker
) => {
    try {
        const resp = await tuzimbeApi.get(
            `/worker/filter/?name=${name}`
        );
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
