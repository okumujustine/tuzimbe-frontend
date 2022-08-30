import { MeasurementMethod } from '../helpers/materials/types';
import { parseError } from '../helpers/utils';
import { tuzimbeApi } from './axios';


export const getMeasurementMethods: () => Promise<string | MeasurementMethod[]> = async () => {
    try {
        const resp = await tuzimbeApi.get(
            "/material/get_all_measurement_methods/"
        );
        return resp.data;
    } catch (error) {
        return parseError(error)
    }
}
