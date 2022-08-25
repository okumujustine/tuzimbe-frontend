import { Materials, SearchMaterial } from '../helpers/materials/interface';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export const searchMaterials: (params: SearchMaterial) => Promise<string | Materials[]> = async (
    { name }: SearchMaterial
) => {
    try {
        const resp = await tuzimbeApi.get(
            `/material/filter/?name__icontains=${name}`
        );
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
