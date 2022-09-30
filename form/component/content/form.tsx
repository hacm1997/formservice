import { useState } from "react";
import { useData, useMoreInfo, str2bool, useGetData } from "../../../service/services";
import stateService from "../../../service/services";
import { MultiSelect } from "react-multi-select-component";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FetchState } from "../../../service/types";


export default function Form() {

    const [dataCol, dataLatam, optionsYears, optionValues, optionTopic, state, initialState, setState] = useData();
    let [hidden, hidden2, hidden3, hidden4, hiddenEmp] = useMoreInfo();
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [forms, fetchState, cookies, getForms] = useGetData();
    const [url] = useGetData();
    const dpto: Array<[]> = [];
    const cities: any[] = [];
    const Years: any[] = [];
    const topics: any[] = [];
    const newDate = new Date().toJSON();

    selectedYears.map((sely:any) => ( 
        Years.push(sely.value)
    ));
    selectedTopic.map((stopic:any) => (
        topics.push(stopic.value)
    ));
    //Init the save to form
    const initSavePostForm = {
        tenant: "ccc",
        form_ref: "juventud",
        created_at: newDate,
        comm_pref: ["email"],
        form_data: {name: state.nameIn, type_cc:state.type_ccIn, cc:state.ccIn, email: state.emailIn, cellphone: state.cellphoneIn, 
            country: state.countryIn, city: state.cityIn, first_time: state.first_timeIn, years_assisted: Years,
            topic_to_learn: topics, emprendour: state.emprendourIn, entrepreneurship_bussines: state.entrepreneurship_bussinesIn,
            entrepreneurship_phase: state.entrepreneurship_phaseIn, interest_more_info: state.interest_more_infoIn,
            expected_event: state.expected_eventIn, assitance_to_next_event: state.assitance_to_next_eventIn,
            data_protection: state.data_protectionIn
        }
    };

    console.log(cookies);
    //Function handle, get de values input's
    const handleChange2 = async (evt:any) =>{
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: str2bool(value)
        });
    }

    function closeModal(){
        state.show = false;
        
        window.location.reload();
    }
    function closeModal2(){
        state.show = false;
    }

    //Get departments if the country is Colombia
    if(state.countryIn == "Colombia"){
        hidden = true;
        if(state.dptoIn == "Bolívar"){
            cities.push('Cartagena');
        }
    }else{
        hidden = false;
    }

    //GET DEPARTAMENTOS AND CITIES
    const getDptos = async () =>{
        for(let d = 0;d < dataCol.length;d++){
    
            if(dpto.includes(dataCol[d]['departamento'])){
                
            }else{
                dpto.push(dataCol[d]['departamento']);
                
            }
        }
        //GET CITIES/MUNICIPIOS
        const selectCity = async () =>{
            for(let m = 0;m < dataCol.length;m++){
                if(dataCol[m]["departamento"] == state.dptoIn){
                    cities.push(dataCol[m]["municipio"]);
                }
                
            }
        }
        selectCity();
    }
    getDptos();

    //Verification's
    if(state.emailIn != state.verifyEamil){
        hidden3 = true;
    }
    if(state.type_ccIn) {
        hidden2 = true;
    }
    if(state.first_timeIn == false){
        hidden4 = true;
    }else{
        hidden4 = false;
        Years.length = 0;
        Years.push("No he ido a ninguno")
    }
    if(state.emprendourIn?.toLocaleLowerCase() == "si"){
        hiddenEmp = true;
    }

    //Method for Save the Form
    const saveForm = (ev:any) => {
        
        if(hidden3 == false){

            var dt = initSavePostForm;
            console.log(dt);
            stateService.create(dt)
  
            state.submitted = true;
            
            ev.preventDefault();
            state.show = true;

        }else{
            
            if(hidden3 == true){
                state.submitted = false;
                ev.preventDefault();
                state.show = true; 
            }
        }
    };

    return (
        <>
        
        <div className="container">
            <form>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es tu nombre completo?</label>
                    <div className="col-sm-10">
                        <input
                        type="text"
                        className="form-control"
                        required
                        value={state.nameIn}
                        onChange={handleChange2}
                        name="nameIn" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="identy" className="col-sm-2 col-form-label">¿Tienes cédula o tarjeta de identidad?</label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} name="type_ccIn" id="type_ccIn" className="form-control" required>
                            <option value="">Seleccione...</option>
                            <option value="Cédula">Cédula</option>
                            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                        </select>
                    </div>
                </div>

                {hidden2 ?<div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es el número de tu cédula/tarjeta de identidad?</label>
                    <div className="col-sm-10">
                        <input
                        type="number"
                        className="form-control"
                        id="ccIn"
                        required
                        value={state.ccIn}
                        onChange={handleChange2}
                        name="ccIn" />
                    </div>
                </div>: null}

                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es tu correo?</label>
                    <div className="col-sm-10">
                        <input
                        type="email"
                        className="form-control"
                        id="emailIn"
                        required
                        value={state.emailIn}
                        onChange={handleChange2}
                        name="emailIn" />
                    </div>
                </div><br/>

                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Repite tu correo, por si acaso</label>
                    <div className="col-sm-10">
                        <input
                        type="email"
                        className="form-control"
                        id="verifyEamil"
                        required
                        value={state.verifyEamil}
                        onChange={handleChange2}
                        name="verifyEamil" />
                        {hidden3 ? <p style={{color: 'red'}}>¡Los correos no coinciden!</p>: null}
                    </div>
                </div><br/>

                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es tu número de celular?</label>
                    <div className="col-sm-10">
                        <input
                        type="number"
                        className="form-control"
                        id="cellphoneIn"
                        required
                        value={state.cellphoneIn}
                        onChange={handleChange2}
                        name="cellphoneIn" />
                    </div>
                </div><br/>
                

                <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">País: </label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} className="form-control" id="countryIn" name="countryIn" required>
                            <option value="">Seleccione país</option>
                            {dataLatam.sort().map((ltm) => ( 
                                <option key={ltm.value} value={ltm.value}>{ltm.label}</option>
                            ))}
                        </select>
                    </div>
                </div><br/>

                {hidden ? <div id="col">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es tu departamento?</label>
                        <div className="col-sm-10">
                            <select onChange={handleChange2} name="dptoIn" className="form-control" required>
                                <option value="">Seleccione departamento...</option>
                                {dpto.sort().map((dpt:any) => ( 
                                    <option key={dpt} value={dpt}>{dpt}</option>
                                ))}
                            </select>
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">¿En qué ciudad vives?</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={handleChange2} id="cityIn" name="cityIn" required>
                                <option value="">Seleccione ciudad...</option>
                                {cities.sort().map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>: null}<br/>

                <div className="form-group row">
                    <label htmlFor="primerForo" className="col-sm-2 col-form-label">¿Este es tu primer Foro de jóvenes?</label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} name="first_timeIn" id="first_timeIn" className="form-control" >
                            <option value="null">Seleccione...</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                {hidden4 ?<div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿En qué otros años has asistido?</label>
                    <div className="col-sm-10">
                        <MultiSelect
                            options={optionsYears}
                            value={selectedYears}
                            onChange={setSelectedYears}
                            labelledBy="Seleccione"
                        />
                    </div>                    
                </div>: null}

                <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">¿Cuál es el tema que más te interesa aprender?</label>
                    <div className="col-sm-10">
                        <MultiSelect
                            options={optionTopic}
                            value={selectedTopic}
                            onChange={setSelectedTopic}
                            labelledBy="Select"
                        />
                    </div>
                </div><br/>
                
                <div id="emprendedor">
                    <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">¿Eres emprendedor?</label>
                        <div className="col-sm-10">
                            <select onChange={handleChange2} className="form-control" id="emprendourIn" name="emprendourIn" required>
                                <option value="">Seleccione...</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                                <option value="No pero me gustaría serlo">No pero me gustaría serlo</option>
                            </select>
                        </div>
                    </div><br/>

                    {hiddenEmp ?
                    <div>
                        <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Cuéntanos cómo se llama y de qué se trata</label>
                            <div className="col-sm-10">
                                <textarea
                                className="form-control"
                                value={state.entrepreneurship_bussinesIn}
                                onChange={handleChange2}
                                name="entrepreneurship_bussinesIn" />
                            </div>
                        </div><br/>

                        <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">¿En qué fase se encuentra tu emprendimiento?</label>
                            <div className="col-sm-10">
                                <select onChange={handleChange2} className="form-control" id="entrepreneurship_phaseIn" name="entrepreneurship_phaseIn">
                                    <option value="">Seleccione...</option>
                                    <option value="ideación">Ideación</option>
                                    <option value="validación">Validación</option>
                                    <option value="aceleración">Aceleración</option>
                                </select>
                            </div>
                        </div><br/>
                    </div>: null}
                </div>

                <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">¿Te gustaría enterarte de todos los programas que tiene la Cámara de Comercio de Cartagena para los jóvenes?</label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} className="form-control" id="interest_more_infoIn" name="interest_more_infoIn" required>
                            <option value="">Seleccione...</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                            <option value="Tal vez">Tal vez</option>
                        </select>
                    </div>
                </div><br/>

                <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">¿Qué esperas de este evento?</label>
                    <div className="col-sm-10">
                        <textarea
                        className="form-control"
                        value={state.expected_eventIn}
                        onChange={handleChange2}
                        name="expected_eventIn" required/>
                    </div>
                </div><br/>

                <div className="form-group row">
                    <label htmlFor="primerForo" className="col-sm-2 col-form-label">¿Confirmas tu asistencia al foro de jóvenes el próximo 29 de octubre?</label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} name="assitance_to_next_eventIn" id="assitance_to_next_eventIn" className="form-control" required>
                            <option value="">Seleccione...</option>
                            
                            {optionValues.map((opt:any) => ( 
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="primerForo" className="col-sm-2 col-form-label">¿Aceptas el uso de tratamiento de tus datos para fines del foro?</label>
                    <div className="col-sm-10">
                        <select onChange={handleChange2} name="data_protectionIn" id="data_protectionIn" className="form-control" required>
                            <option value="">Seleccione...</option>
                            <option value="true">Acepto</option>
                            <option value="false">No acepto</option>
                        </select>
                    </div>
                </div>

                <input onClick={saveForm} type="submit" className="btn btn-success" value="Listo"/>

            </form> 
            <br /><hr />

        </div>

        <div className="container">
                
                {fetchState === FetchState.DEFAULT && (
                    <>
                        <div>
                            <p>All Data of Forms</p>
                        </div>
                        <button onClick={getForms}>Get data</button>
                    </> 
                )}
                {fetchState === FetchState.LOADING && <p>Fetching forms...</p>}
                {fetchState === FetchState.ERROR && (
                    <>
                        <p>Error! something went wrong</p>
                        <button onClick={getForms}>Get data</button>
                    </>
                )}
                {
                    fetchState === FetchState.SUCCESS && (
                        <>
                            <p>Success! List of forms in DB</p>
                            {forms}
                        </>
                    )
                }
            </div>

            <a type="button" href={"http://localhost:8080/api/v1/lead/"+"?form=juventud"} target="__blank"> Download </a>

            <Modal show={state.show} >
                <Modal.Header closeButton>
                <Modal.Title>Foro Juventud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {state.submitted ? <p>¡Te has registrado correctamente!</p>: null}
                    {hidden3 ?
                    <div>
                        Los correos no coinciden
                    </div>
                    :null}
                </Modal.Body>
                <Modal.Footer>
                {state.submitted ?<Button variant="secondary" onClick={closeModal}>
                        Cerrar
                    </Button>: null}
                    {hidden3 ?<Button variant="secondary" onClick={closeModal2}>
                        Cerrar
                    </Button>: null}
                </Modal.Footer>
            </Modal>
        </>
    )
}