export enum FetchState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type PostData = {
    tenant: string;
    form_ref: string;
    created_at: string;
    comm_pref: Array<string>;
    //data: any | null;
    form_data: {name: string, type_cc: string, cc: string, email: string, cellphone: string, country: string, 
        city: string|null, first_time: boolean, years_assisted:string[], topic_to_learn:string[],
        emprendour: string, entrepreneurship_bussines:string, entrepreneurship_phase:string,
        interest_more_info: string, expected_event:string, assitance_to_next_event:boolean, data_protection:boolean
    };
}