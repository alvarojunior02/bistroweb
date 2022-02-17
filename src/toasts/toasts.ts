import { toast } from "react-toastify";

export const sendToastSuccess = (message: string) => toast.success(message, {
    autoClose: 3000
});

export const sendToastError = (message: string) => toast.error(message, {
    autoClose: 3000
});

export const sendToastWarning = (message: string) => toast.warning(message, {
    autoClose: 3000
});

export const sendToastInfo = (message: string) => toast.info(message, {
    autoClose: 3000
});