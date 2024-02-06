
// ANCHOR --> IMPORTS REACT
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS API
import integraAPI from "../../services";
// END API

// ANCHOR --> IMPORTS COMPONENTS
import { BarraConversas } from "../../components/barraConversas";
import { BarraLateral } from "../../components/barraLateral";
import { Conversa } from "../../components/conversa";
import { TelaInicial } from "../TelaInicial";
import { NotFound } from "../err";
// END COMPONENTS


export const Chat = () => {

    // SECTION --> PEGA INSTANCIA PASSADA PELA URL
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    // STUB --> ESTADO LOCAL PARA ARMAZENAR VALOR DOS PARÂMETROS DE CONSULTA
    const instanceParamUrl = params.get("instance");

    const instanceData = atob(instanceParamUrl).split(`@`);
    
    // STUB --> VARIAVEL QUE VEM DO CONTEXT PARA ABRIR UMA CONVERSA
    const { conversaAberta, setInstanceParam, setLoggedUserParam } = useContext(VariaveisContext);

    const [loggedUser, setLoggedUser] = useState();
    const [logado, setLogado] = useState(false);
    
    useEffect(() => {
        const handleLoggedUser = async () => {
            try {
                const res = await integraAPI.get("users-logged", {
                    params: { instance: instanceData[0], logged_user: instanceData[1] }
                });
                
                if (JSON.stringify(loggedUser) !== JSON.stringify(res.data)) {
                    if (res.data && res.data.length > 0 && JSON.stringify(loggedUser) !== JSON.stringify(res.data)) {
                        setLoggedUser(res.data);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar usuários logados:", error);
            }
        };

        handleLoggedUser();
        const interval = setInterval(handleLoggedUser, 120000); // Chama a cada 2 minutos (120 segundos)
        return () => clearInterval(interval);
    }, [instanceData]);

    useEffect(() => {
        setInstanceParam(instanceData[0]);
        setLoggedUserParam(instanceData[1]);

    }, [setInstanceParam, setLoggedUserParam, instanceData]);

    useEffect(() => {
        loggedUser?.map((data) => {            
            if(data.login === instanceData[1]) {
                return setLogado(true);
            } 
        })

    }, [loggedUser, instanceData]);
    
    return(
        <TelaChatContainer>
        { logado ?
            <ContentChat>
                <BarraLateral />

                <BarraConversas />

                { conversaAberta ? <Conversa /> : <TelaInicial />}
            </ContentChat>

            : <NotFound to="#" />
        }
        </TelaChatContainer>
    );
};

const TelaChatContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(100%, 100vw);
    grid-template-rows: fit-content(100%) auto fit-content(100%);
`;

const ContentChat = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;