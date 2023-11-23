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

    const [eventos, setEventos] = useState([]);
    const [tipoEventos, setTipoEventos] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            try {
                const retorno = await api.get(eventsResource)
                setEventos(retorno.data)

            } catch (error) {
                alert("Deu ruiiim")
            }
        }
        loadEvents();
    })

    useEffect(() => {
        async function loadEventsType() {
            try {
                const retorno = await api.get(eventsTypeResource)
                setTipoEventos(retorno.data)
            } catch (error) {
                alert("Deu ruuiiim")
            }
        }
        loadEventsType();
    })

   
    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.IdTipoEvento, text: element.titulo })
        })
        return arrayOptions
    }
    return(
    <MainContent>

        <section className="cadastro-evento-section">
            <Container>

                <div className="cadastro-evento__box">
                    <Titulo titleText={"Pagina de Eventos"}/>

                    <ImageIllustrator imageRender={eventImage}/>
                    <form action="" className="ftipo-evento">
                        <Input 
                        id="nomeEvento"
                        type= "text"
                        name="nomeEvento"
                        placeholder="Nome"
                        required="required"
                        />

                        <Input 
                          id="descricao"
                          type="text"
                          name="descricao"
                          placeholder="Descrição"
                          required="required"
                        />

                        <Input 
                        id="data"
                        type={'date'}
                        name="data"
                        placeholder="dd/mm/aa"
                        required="required"
                        />

                         <Select
                                    id='TiposEvento'
                                    name={'tiposEvento'}
                                    required={'required'}
                                    options={tituloTipo(tipoEventos)}
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
                />
            </Container>
        </section>
    </MainContent>
    );
};

export default EventosPage;