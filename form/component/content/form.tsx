import { useGetForms } from "../../../service/services";
import { FetchState } from "../../../service/types";
import styles from "./styles.module.css";

export default function Form() {
    const [forms, fetchState, getForms] = useGetForms();
    
    return (
        <>
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
                            <ul className="posts-list">
                                {
                                    forms.map((forms) => (
                                        <div key={forms.tenant} className="post">
                                            <li><h4>Información de formulario</h4></li>

                                            <p>Página Web: <strong>{forms.tenant.toUpperCase()}</strong></p>
                                            <p>Formulario de: <strong>{forms.form}</strong></p>
                                            <p>Fecha de post: <strong>{forms.date}</strong></p>
                                            <p>Canal de comunicación: <strong>{forms.channels}</strong></p>
                                            
                                        
                                            <li><h4>Información de contacto</h4></li>
                                            
                                            <p>Nombre: <strong>{forms.data.name}</strong></p>
                                            <p>E-mail: <strong>{forms.data.email}</strong></p>
                                            <p>Teléfono: <strong>{forms.data.phone}</strong></p>
                                            <p>Mensaje: <strong>{forms.data.message}</strong></p>
                                            <hr />
                                        </div>
                                            
                                        
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </div>
        </>
    )
}