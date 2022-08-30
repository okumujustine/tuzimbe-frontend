import { AddMaterialParams, Materials } from '../helpers/materials/types';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export async function addMaterial(
    params: AddMaterialParams
): Promise<string | Materials> {
    try {
        const resp = await tuzimbeApi.post(`/material/add_material/`, {
            ...params
        });
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}

