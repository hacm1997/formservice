import axios from 'axios';
import { useState /*express*/ } from "react";
import { FetchState, PostData } from "./types";

const url = "http://localhost:8080/api/v1/lead/";

export function useGetForms() {
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
    const [forms, setForms] = useState<Array<PostData>>([]);
    const getForms = async () => {
        try {
            setFetchState(FetchState.LOADING);

            const res = await axios.get(url);
            const resData = res.data as Array<PostData>;

            setForms(resData);
            setFetchState(FetchState.SUCCESS);

        } catch (err) {
            setFetchState(FetchState.ERROR);
        }
    };

    return [forms, fetchState, getForms] as const;
}

/*export function PostForm(){
    const [tenant, setTenant] = useState('');
    const [info, setInfo] = useState('');
    const [date, setDate] = useState('');
    const [status, setSatus] = useState('');
    const [channels, setChannels] = useState('');
    const [dat, setData] = useState('');

    function savePost(){
        console.log({tenant, info, date, status, channels, dat});
        let data={tenant, info, date, status, channels, dat};
        fetch(url,{
            method:'POST',

            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            //console.log("Result", result);
            result.json().then((resp)=>{
                console.log("resp", resp);
            })
        })
    }

    return [tenant, info, date, status, channels, dat,
        setTenant, setInfo, setDate, setSatus, setChannels, setData, savePost];
}

export default PostForm*/
