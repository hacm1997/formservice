import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalSuccess : React.FC<{show:boolean}> = ({show}) => {
    
    const [showTwo, setShow] = useState(false);
    //setShow(show);

    function closeModal(){
        console.log(show)
        show = false;
        console.log(show)
    }

    return (
        <>
            <Modal show={show} >
                <Modal.Header closeButton>
                <Modal.Title>Foro Juventud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¡Te has registrado correctamente!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSuccess;