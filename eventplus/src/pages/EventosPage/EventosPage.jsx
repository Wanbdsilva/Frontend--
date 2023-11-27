import React, { useEffect, useState } from "react";
import './EventosPage.css';
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Titulo from "../../components/Title/Title";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventImage from "../../assets/images/evento.svg";
import {Button, Input, Select} from "../../components/FormComponents/FormComponents";
import api, { eventsResource, eventsTypeResource } from "../../Services/Service";
import TableEv from "./TableEventos/TableEv";


const EventosPage = () => {

    const idInstituicao = "34c6abb6-dec4-4fa9-91bd-c0b5ac7a39bf"
    const [eventos, setEventos] = useState([]);
    const [tipoEventos, setTipoEventos] = useState([]);
    const [nomeEvento, setNomeEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [idTipoEvento, setIdTipoEvento] = useState("");
    const [frmEditData, setFrmEditData] = useState("");

    async function loadEvents() {
        try {
            const retorno = await api.get(eventsResource)
            setEventos(retorno.data)
            console.log(retorno.data)
        } catch (error) {
            alert("Deu ruiiim")
        }
    }
    
    async function loadEventsType() {
        try {
            const retorno = await api.get(eventsTypeResource)
            setTipoEventos(retorno.data)
        } catch (error) {
            alert("Deu ruuiiim")
        }
    }

    // EdITAR Formulario
    async function showUpdateForm(evento) {
        setFrmEditData(evento);
        setFrmEdit(true);
    }
    

    useEffect(() => {
        loadEvents();
        loadEventsType();
    }, [])
   
    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.idTipoEvento, text: element.titulo })
        })
        return arrayOptions;
    }

    async function cadastrar(e) {
        e.preventDefault()
        try {
            await api.post(eventsResource, {
                nomeEvento,
                descricao,
                dataEvento,
                idTipoEvento,
                idInstituicao
            })
            loadEvents();
        } catch (error) { 
        }
    }

    async function deletar(id) {
        if(! window.confirm("Confirma a exclusao?"))
            return;
        try {
            await api.delete(`${eventsResource}/${id}`)
            loadEvents();
        } catch (error) {
            
        }
    }

    return(

    <MainContent>
        <section className="cadastro-evento-section">
            <Container>

                <div className="cadastro-evento__box">
                    <Titulo titleText={"Pagina de Eventos"}/>

                    <ImageIllustrator imageRender={eventImage}/>
                    <form action="" className="ftipo-evento" onSubmit={cadastrar}>
                        <Input 
                            id="nomeEvento"
                            type= "text"
                            name="nomeEvento"
                            placeholder="Nome"
                            required="required"
                            value={nomeEvento}
                            manipulationFunction={(e) => {
                                setNomeEvento(e.target.value)
                            }}
                        />

                        <Input 
                            id="descricao"
                            type="text"
                            name="descricao"
                            placeholder="Descrição"
                            required="required"
                            value={descricao}
                            manipulationFunction={(e) => {
                            setDescricao(e.target.value)
                            }}
                        />

                        <Input 
                            id="data"
                            type={"date"}
                            name="data"
                            placeholder="dd/mm/aa"
                            required="required"
                            value={dataEvento}
                            manipulationFunction={(e) => {
                                setDataEvento(e.target.value)
                            }}
                        />

                            {/* EDICAO */}
                        <>
                            <Input 
                                type="date"
                                required={true}
                                id="dataEvento"
                                name="dataEvento"
                                placeholder="Data do Evento"
                                value={new Date(frmEditData.dataEvento).toLocaleDateString("sv-SE")}
                            />

                            <Input 
                                type="date"
                                required={true}
                                id="nome"
                                name="nome"
                                placeholder="Nome Evento"
                                value={frmEditData.nomeEvento}
                                manipulationFunction={(e) => {
                                    setFrmEditData({
                                        ...frmEditData,
                                        nomeEvento: e.target.value,
                                    });
                                }} 
                            />
                            
                            <Input 
                                type="date"
                                required={true}
                                id="descricao"
                                name="descricao"
                                placeholder="Descricao do Evento"
                                value={frmEditData.descricao}
                                manipulationFunction={(e) => {
                                    setFrmEditData({
                                        ...frmEditData,
                                        descricao: e.target.value,
                                    });
                                }}
                            />

                            <Input 
                                type="date"
                                required={true}
                                id="TiposEvento"
                                name="TiposEvento"
                                placeholder="Tipos do Evento"
                                value={frmEditData.tipoEventos}
                                manipulationFunction={(e) => {
                                    setFrmEditData({
                                        ...frmEditData,
                                        tipoEventos: e.target.value,
                                    });
                                }}
                            />

                            <div className="buttons-editbox">
                                <Button
                                    textButton="Atualizar"
                                    id="atualizar"
                                    name="Atualiza"
                                    type="submit"
                                    additionalClass="button-component--middle"
                                />

                                <Button
                                    textButton="Cancelar"
                                    id="cancelar"
                                    name="Cancelar"
                                    type="button"
                                    additionalClass="button-component--middle"
                                />
                            </div>
                        </>

                         <Select    
                            id='TiposEvento'
                            name={'tiposEvento'}
                            required={'required'}
                            options={tituloTipo(tipoEventos)}
                            value={idTipoEvento}
                            manipulationFunction={(e) => {
                                setIdTipoEvento(e.target.value)
                                console.log(e.target.value)
                            }}
                         />

                        <Button 
                            textButton="Cadastrar"
                            id="cadastrar"
                            name="cadastrar"
                            type="submit"
                        />
                       
                    </form>
                </div>
            </Container>
        </section>
            <section className="lista-eventos-section">
                <Container>
                    <Titulo titleText={"Lista de Eventos"} color={"white"}/>

                    <TableEv 
                        dados={eventos}
                        fnDelete={deletar}   
                        fnUpdate={showUpdateForm}     
                    />
                </Container>
        </section>
    </MainContent>
    );
};

export default EventosPage;