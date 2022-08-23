import { parseError } from '../helpers/utils';
import { GetWorkersResponse } from '../helpers/workers/types';
import { tuzimbeApi } from './axios';


export const getWorkers: () => Promise<string | GetWorkersResponse> = async () => {
    try {
        const resp = await tuzimbeApi.get<GetWorkersResponse>(
            '/users',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
