import { Materials } from '../helpers/materials/types';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export const getMaterials: () => Promise<string | Materials[]> = async () => {
    try {
        const resp = await tuzimbeApi.get(
            "/material/filter/"
        );
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
