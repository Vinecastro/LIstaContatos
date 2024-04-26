import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneVolume, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import './Contato.css'
//import { v4 as chaves } from "react"
export default function Contato(props) {
    return (
        <div className="mx-2">
            <div className="container componente-contato my-4">
                <div className="row">
                    <div className="col p-2">
                        <h4>
                            <FontAwesomeIcon icon={faUser} className="me-3"></FontAwesomeIcon>
                            {props.nome}
                        </h4>
                    </div>
                    <div className="col p-2">
                        <h4>
                            <FontAwesomeIcon icon={faPhoneVolume} className="me-3"></FontAwesomeIcon>
                            {props.telefone}
                        </h4>
                    </div>
                    <div className="col p-2 text-end">
                        <h4>
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="me-3"
                                onClick={() => { props.remover(props.id) }}></FontAwesomeIcon>
                        </h4>
                    </div>
                </div>
            </div>
        </div>

    )
}