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

export const delaySemulator = (ms: any) => new Promise(res => setTimeout(res, ms));

export const todaysDate = () => {
    let today = new Date().toLocaleDateString()
    const formatSplitted = today.split("/")
    const month = formatSplitted[0]
    const date = formatSplitted[1]

    let finalDate
    if (date.length !== 1) {
        finalDate = date
    } else {
        finalDate = `0${date}`
    }

    let finalMonth
    if (month.length !== 1) {
        finalMonth = month
    } else {
        finalMonth = `0${month}`
    }

    const finalTodaysDate = `${formatSplitted[2]}-${finalMonth}-${finalDate}`
    return finalTodaysDate
}

export const timeFromDateTime = (dateTime: string) => {
    const datetime = new Date(dateTime)
    return datetime.toLocaleTimeString();
}