import axios from "axios";


export const valueNotString = () => {
    return "parse error please"
}

export const parseError: (error: any) => string = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
    } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
    }
}