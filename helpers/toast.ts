import { toast } from 'react-toastify';

export const toastSuccess = (msg: any) => toast.success(msg);
export const toastError = (msg: any) => toast.error(msg);