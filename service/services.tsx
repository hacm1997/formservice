import axios from 'axios';
import { useState /*express*/ } from "react";
import { FetchState, PostData } from "./types";
import http from "./http-common";
import { useCookies } from "react-cookie";
const url = "http://localhost:8080/api/v1/lead/";
const col = "https://www.datos.gov.co/resource/xdk5-pm3f.json";

//Paises de LATAM
const latinos = [
    {
        label: "Argentina",
        value: "Argentina",
    },
    {
        label: "Bolivia",
        value: "Bolivia",
    },
    {
        label: "Brasil",
        value: "Brasil",
    },
    {
        label: "Chile",
        value: "Chile",
    },
    {
        label: "Colombia",
        value: "Colombia",
    },
    {
        label: "Costa Rica",
        value: "Costa Rica",
    },
    {
        label: "Cuba",
        value: "Cuba",
    },
    {
        label: "Ecuador",
        value: "Ecuador",
    },
    {
        label: "El Salvador",
        value: "Guayana Francesa",
    },
    {
        label: "Granada",
        value: "Granada",
    },
    {
        label: "Guatemala",
        value: "Guatemala",
    },
    {
        label: "Guayana",
        value: "Guayana",
    },
    {
        label: "Haití",
        value: "Haití",
    },
    {
        label: "Honduras",
        value: "Honduras",
    },
    {
        label: "Jamaica",
        value: "Jamaica",
    },
    {
        label: "México",
        value: "México",
    },
    {
        label: "Nicaragua",
        value: "Nicaragua",
    },
    {
        label: "Paraguay",
        value: "Paraguay",
    },
    {
        label: "Panamá",
        value: "Panamá",
    },
    {
        label: "Perú",
        value: "Perú",
    },
    {
        label: "Puerto Rico",
        value: "Puerto Rico",
    },
    {
        label: "República Dominicana",
        value: "República Dominicana",
    },
    {
        label: "Surinam",
        value: "Surinam",
    },
    {
        label: "Uruguay",
        value: "Uruguay",
    },
    {
        label: "Venezuela",
        value: "Venezuela",
    }
]

const OptionV = [
    {value: true, label: 'Sí'},
    {value: false, label: 'No'}
];

const optionsY = [
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' }
  ]

const optionsT = [
    {value: "emprendimiento", label: "Emprendimiento"},
    {value: "empleabilidad", label: "Empleabilidad"},
    {value: "salud mental", label: "Salud Mental"},
    {value: "sostenibilidad", label: "Sostenibilidad"},
    {value: "tecnología", label: "Tecnología"}
]

const hidden2 = false;
let hidden3 = false;
let hidden = false; //Hidden for dptos and cities id true, only if country is Colombia
let hidden4 = false;
let hiddenEmp = false;

//Force convert data true or false to Booleand field
export const str2bool = (value:any) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
         if (value.toLowerCase() === "null") return null;
    }
    return value;
}

export function useMoreInfo() {

    return[hidden, hidden2, hidden3, hidden4, hiddenEmp];
}

const initialState = [
    {
        nameIn: "",
        emailIn: "",
        verifyEamil: "",
        cellphoneIn: "",
        countryIn: "",
        type_ccIn: "",
        ccIn: "",
        cityIn: "",
        first_timeIn: true,
        years_assistedIn: [""],
        topic_to_learnIn: [""],
        emprendourIn: "",
        entrepreneurship_bussinesIn: "",
        entrepreneurship_phaseIn: "",
        interest_more_infoIn: "",
        expected_eventIn: "",
        assitance_to_next_eventIn: false,
        data_protectionIn: false,
        msgIn: "",
        dptoIn: "",
        show: false,
        submitted: false
    }
]

export function useData() {
    const [dataCol, setDataCol] = useState<Array<any>>([]);//Colombian cities and dptos
    const [dataLatam, setDataLatam] = useState<Array<any>>([]);//latam countries
    const [optionsYears, setOptionsYears] = useState<Array<any>>([]);
    const [optionValues, setOptionsValues] = useState<Array<any>>([]);
    const [optionTopic, setOptionTopic] = useState<Array<any>>([]);

    //Get inputs
    const [state, setState] = useState({
        nameIn: "",
        emailIn: "",
        verifyEamil: "",
        cellphoneIn: "",
        countryIn: "",
        type_ccIn: "",
        ccIn: "",
        cityIn: "",
        first_timeIn: true,
        years_assistedIn: [""],
        topic_to_learnIn: [""],
        emprendourIn: "",
        entrepreneurship_bussinesIn: "",
        entrepreneurship_phaseIn: "",
        interest_more_infoIn: "",
        expected_eventIn: "",
        assitance_to_next_eventIn: false,
        data_protectionIn: false,
        msgIn: "",
        dptoIn: "",
        show: false,
        submitted: false
    });

    const getData = async () => {
        try {
            const resp = await axios.get(col);
            //console.log("la data: "+resp);
            const resData = resp.data as Array<any>;
            setDataCol(resData);//save Colombian cities and dptos
            setDataLatam(latinos);//save Latam countries
            setOptionsYears(optionsY);
            setOptionsValues(OptionV);
            setOptionTopic(optionsT);
        }catch (err) {
            console.log(err +" ERROR TO GET DATA!");
        }
    }
    getData();
    return [dataCol, dataLatam, optionsYears, optionValues, optionTopic, state, initialState, setState] as const;
}

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

export function useGetData() {
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
    const [forms, setForms] = useState([]);
    const [cookies, setCookie] = useCookies(['tenant']);
    const getForms = async () => {
        try {
            setFetchState(FetchState.LOADING);
            setCookie('tenant', "ccc", { path: '/' });

            const res = await axios.get(url+"?form=juventud",{
                withCredentials: true
            });
            const resData = res.data as [];
            setForms(resData);
            setFetchState(FetchState.SUCCESS);

        } catch (err) {
            setFetchState(FetchState.ERROR);
        }
    };

    return [forms, fetchState, cookies, getForms, url] as const;
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
const create = (data: PostData) => {
    return http.post<PostData>("/", data);
}

const postService = {
    create,
};

export default postService;
