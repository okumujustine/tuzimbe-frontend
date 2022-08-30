import axios from "axios";


export const valueNotString = () => {
    return "parse error please"
}

export const parseError: (error: any) => string = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log('error message: ', error.response?.data);
        if (error.response && error.response?.data && typeof error.response?.data === "string") {
            return error.response?.data
        }
        return error.message;
    } else {
        return 'An unexpected error occurred';
    }
}

export const delaySemulator = (ms: any) => new Promise(res => setTimeout(res, ms));

export const todaysDate = () => {
    let today = new Date().toLocaleDateString()
    return fomatDate(today)
}

export const fomatDate = (today: string) => {
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

export const formatAMPM = (dateParam: string) => {
    const date = new Date(dateParam)
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
};