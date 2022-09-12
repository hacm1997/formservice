export enum FetchState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type PostData = {
    tenant: string;
    form: string;
    date: string;
    status: string;
    channels: Array<string>;
    //data: any | null;
    data: {name: '', email: '', phone: '', message: ''};
}