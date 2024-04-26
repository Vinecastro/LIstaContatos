import { React, useState, useRef, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faList, faTrash } from "@fortawesome/free-solid-svg-icons"

import './App.css'
import { v4 as chave } from 'uuid'
import Contato from "./Components/Contato"
//import ListaContatos from "./components/ListaContatos"
export default function App() {

    //states
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
    const [listaContatos, setListaContatos] = useState([])

    // useRef
    const inputNome = useRef()
    const inputTelefone = useRef()

    //metodos
    function definirNome(event) {
        setContato({ ...contato, nome: event.target.value })
    }

    function definirTelefone(event) {
        setContato({ ...contato, telefone: event.target.value })
    }

    function adicionarContato() {

        //validação dos campos
        if (contato.nome === "" || contato.telefone === "") return

        // verificar contato existente
        let duplicando = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        if (typeof duplicando !== 'undefined') {
            inputTelefone.current.focus()
            return
        }

        //adicionar contato a lista
        setListaContatos([...listaContatos, { ...contato, id: chave() }])


        //limpar o contato
        setContato({ nome: '', telefone: '' })

        //colocar focus no input nome
        inputNome.current.focus()
    }

    function enterAdicionarContato(event) {
        if (event.code === "Enter") {
            adicionarContato()
        }
    }

    //persistencia do state
    //carregar listaContatos do localStorage
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') !== null) {
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //atualizar a lista de contatos no localStorege
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
    }, [listaContatos])

    //limpar toda lista
    function limparStorage() {
        setListaContatos([])
    }

    //remover um contato da lista
    function removerContato(id) {
        let tmp = listaContatos.filter(ct => ct.id !== id)
        setListaContatos(tmp)
    }

    return (
        <>
            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h4 className="text-center"><FontAwesomeIcon icon={faList} className="me-3" />LISTA DE CONTATOS</h4>
                    </div>
                </div>
            </div>

            <div className="container-fluid formulario">
                <div className="row">
                    <div className="col p-3">

                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4 ">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label><br />
                                    <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} className="form-control" />
                                </div>
                                <div>
                                    <label className="form-label">Telefone</label><br />
                                    <input type="text" ref={inputTelefone} onChange={definirTelefone} onKeyUp={enterAdicionarContato} value={contato.telefone} className="form-control" />
                                </div>

                                <div className="row mt-3">
                                    <div className="col text-start">
                                        <button onClick={limparStorage} className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} className="me-2"/>
                                            Limpar Lista
                                        </button>
                                    </div>
                                    <div className="col text-end">
                                    <button onClick={adicionarContato} className="btn btn-outline-success">
                                    <FontAwesomeIcon icon={faCirclePlus} className="me-2"/>
                                    Adicionar
                                    </button>
                                        
                                </div>
                             </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* <ListaContatos listaContatos={listaContatos} /> */}

            <ul>
                {listaContatos.map(ct => {
                    return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
                })}
            </ul>

        </>

    )
}