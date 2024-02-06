// ANCHOR --> IMPORTS REACT
import { useCallback, useContext, useEffect, useState } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> STYLED PROP TYPES
import { node, string } from "prop-types";
// END PROP TYPES

// ANCHOR --> IMPORTS SOCKET.IO
import io from "socket.io-client";
// END SOCKET.IO

// ANCHOR --> IMPORTS HELPERS
import { formatId } from "../../helpers/fomatadores/formatadorID.js";
import { notification } from "../../helpers/notification/notification.js"; 
// END HELPERS

// ANCHOR --> IMPORTS COMPONENTS
import { ModalAtendentes, ModalDepartamentos, ModalOpcoes, ModalOpenCall } from "../modal/index.jsx";
import { ButtonPrimario } from "../buttons/index.jsx";
import integraAPI from "../../services/index.js";
// END COMPONENTS

// ANCHOR --> IMPORTS REACT ICONS MD
import { MdClose, MdMoreHoriz, MdOutlineExitToApp, MdQueue, MdOutlinePhoneEnabled } from "react-icons/md";
// END REACT ICONS MD

// ANCHOR --> IMPORTS IMAGES
import integra_image from "../../assets/img/ICONE_INTEGRA_IDEIAS_2_AZUL.png";
// END IMAGES


export const HeaderConversa = ({ fotoPerfil, nomeContato, fila }) => {
    
    const { numeroDeTelefone, dadosAtendimentos, setDadosAtendimentos, conversaIDContatos, setConversaIDContatos, atendenteLogado, setAtendentesLogado, departamentoPermitido, setDepartamentoPermitido, possuiAtendente, setPossuiAtendente, codDepartamento, setConversaAberta, conversaID, setConversaID, modalOpcoes, setModalOpcoes, setNovaMensagem, dataConversas, modalAtendentes, setModalAtendentes, modalDepartamento, setModalDepartamento, modalOpenCall, setModalOpenCall, instanceParam, loggedUserParam } = useContext(VariaveisContext);
    
    // SECTION --> VARIAVEL QUE GUARDA DADOS DO SOCKET.IO
    const [socketIo, setSocketIo] = useState(null);

    // SECTION --> VARIAVEL QUE GUARDA DADOS DOS DEPARTAMENTOS
    const [departamentos, setDepartamentos] = useState();

    // SECTION --> VARIAVEL QUE GUARDA DADOS DOS USUÁRIOS
    const [atendentes, setAtendentes] = useState();

    // const [dadosAtendimentos, setDadosAtendimentos] = useState(dataConversas);
    const [conversaIdAnterior, setConversaIdAnterior] = useState();
    
    const fechaConversa = () => {
        setConversaAberta(false);
        setConversaID('');
        setConversaIDContatos('');
    };
    
    /*const codDepartamentoSplit = codDepartamento.split(',');
    
    if(atendenteLogado?.departamento?.includes(codDepartamentoSplit)) {
        setDepartamentoPermitido(true);
    }*/

    // LINK --> REQUISIÇÃO PARA FECHAR ATENDIMENTO
    const departamentosEAtendentes = useCallback(async () => {
        try {

            // STUB --> REQUISIÇÃO PARA TODOS ATENDENTES LOGADOS
            await integraAPI.get('users', {params: {instance: instanceParam}}).then((res) => setAtendentes(res.data));
            
            // STUB --> REQUISIÇÃO PARA TODOS ATENDENTES LOGADOS
            await integraAPI.get(`users/login/${loggedUserParam}`, {params: {instance: instanceParam}}).then((res) => setAtendentesLogado(res.data));

            // STUB --> REQUISIÇÃO PARA DEPARTAMENTOS 
            await integraAPI.get('departments', {params: {instance: instanceParam, logged_user: loggedUserParam}}).then((res) => setDepartamentos(res.data));
        
        } catch(e) {
            console.log(e);
        }

    }, [instanceParam, loggedUserParam, setAtendentesLogado]);

    // LINK --> REQUISIÇÃO PARA FECHAR ATENDIMENTO
    const handleFecharAtendimento = async () => {
        try {

            const userConfirmation = window.confirm('Tem certeza de que deseja encerrar este atendimento?');
            
            if (!userConfirmation) {
                return;
            }

            // STUB --> REQUISIÇÃO PARA Conversas por ID
            await integraAPI.delete(`conversations/chat-id/${conversaID}`, {params: {instance: instanceParam, logged_user: loggedUserParam}});

            window.location.reload();
        
        } catch(e) {
            console.log(e);
        }
    };

    // LINK --> REQUISIÇÃO PARA ASSUMIR ATENDIMENTO
    const handleAssumirAtendimento = async () => {
        try {

            const userConfirmation = window.confirm('Tem certeza de que deseja assumir este atendimento?');
            
            if (!userConfirmation) {
                return;
            }

            // STUB --> REQUISIÇÃO PARA Conversas por ID
            await integraAPI.put(`conversations/chat-id/${conversaID}`, {atendente: loggedUserParam, observacao: 'Registrado pelo Atendente'}, {params: {instance: instanceParam}});

            window.location.reload();

        } catch(e) {
            console.log(e);
        }
    };

    // LINK --> REQUISIÇÃO PARA ABRIR ATENDIMENTO
    const handleAbrirAtendimento = async (nomeDepartamento, comando) => {
        try {

            const userConfirmation = window.confirm(`Tem certeza de que deseja abrir atendimento para o Departamento: ${nomeDepartamento} ?`);
            
            if (!userConfirmation) {
                return;
            }

            const conversationData = {
                id: null,
                chat_id: conversaID, 
                celular: numeroDeTelefone, 
                mensagem: comando, 
                sender_name: nomeContato, 
                chat_name: nomeContato, 
                data_inclusao: new Date(), 
                tipo: 'text', 
                status: "1",  
                atendente: loggedUserParam, 
                status_msg: '1',  
                observacao: `Registrado pelo atendente ${loggedUserParam}.`, 
                protocol: null,  
                id_empresa: "1", 
                dt_alteracao: null, 
                dt_ultmsg_cli: new Date(), 
                idroute: null, 
                idroutestatus: null, 
                idrouteultret: null, 
                contactItem: null, 
                statusItem: null, 
                userItem: null, 
                departmentItem: null, 
            };


            // STUB --> REQUISIÇÃO PARA Conversas
            await integraAPI.post(`conversations?instance=${instanceParam}&logged_user=${loggedUserParam}&conversa=${conversaID}`, conversationData);

            window.location.reload();

        } catch(e) {
            console.log(e);
        }
    };

    // LINK --> REQUISIÇÃO PARA TRANSFERIR ATENDENTE
    const handleTransferirAtendente = async (loginAtendente, nomeAtendente) => {
        try {
            const userConfirmation = window.confirm(`Tem certeza de que deseja transferir para ${nomeAtendente} ?`);
            
            if (!userConfirmation) {
                return;
            }

            // STUB --> REQUISIÇÃO PARA ATUALIZAR ATENDENTE
            await integraAPI.put(`/conversations/chat-id/${conversaID}`, {atendente: loginAtendente }, {params: {instance: instanceParam}});
        
            window.location.reload();

        } catch (error) {
            console.error(error.message, error);
        }
    };

    // LINK --> REQUISIÇÃO PARA TRANSFERIR DEPARTAMENTO
    const handleTransferirDepartamento = async (nomeDepartamento, comando) => {
        try {
            const userConfirmation = window.confirm(`Tem certeza de que deseja transferir para o Departamento ${nomeDepartamento} ?`);
            
            if (!userConfirmation) {
                return;
            }

            // STUB --> REQUISIÇÃO PARA ATUALIZAR ATENDENTE
            await integraAPI.put(`/conversations/chat-id/${conversaID}`, {mensagem: comando, atendente: '', status: 1 }, {params: {instance: instanceParam}});
        
            window.location.reload();

        } catch (error) {
            console.error(error.message, error);
        }
    };

    const novaMensagemSocket = useCallback(async () => {
        if (!socketIo) setSocketIo(await io(`https://www.integrachat.com.br`));
    
        socketIo.on('newMessage', (newMessage) => {
            let idFormated = formatId(newMessage.chat_id);
    
            setNovaMensagem(newMessage);
    
            if (!newMessage.from_me && possuiAtendente && possuiAtendente === loggedUserParam) {
                if (conversaID === idFormated) {
                    if (Notification.permission === 'granted') {
                        notification(newMessage);
                    } else if (Notification.permission !== 'denied') {
                        Notification.requestPermission().then((Permissions) => {
                            if (Permissions === 'granted') {
                                notification(newMessage);
                            }
                        });
                    }
                }
            }
        });
    
    }, [socketIo, conversaID, possuiAtendente, loggedUserParam, setNovaMensagem]);
    
    const encontrarAtendimentoPorChatId = useCallback( async (chatId) => {
        // const atendimentoEncontrado = dadosAtendimentos.find(atendimento => atendimento.chat_id === chatId);
        const atendimentoEncontrado = dataConversas.find(atendimento => atendimento.chat_id === chatId);
        if (atendimentoEncontrado) {
            setDadosAtendimentos(atendimentoEncontrado)
            setPossuiAtendente(atendimentoEncontrado.userItem)
        } else {
            try {
                // STUB --> REQUISIÇÃO PARA ATUALIZAR ATENDENTE
                const response = await integraAPI.get(`/conversations/chat-id/${chatId}`,{params: {instance: instanceParam, logged_user:loggedUserParam}});
                if (!response.error) {
                    setDadosAtendimentos(response.data)
                    setPossuiAtendente(response.data.userItem)
                } else {
                    setDadosAtendimentos('')
                    setPossuiAtendente('')
                }
            } catch (error) {
                console.error(error.message, error)
            }
        }
    }, [setPossuiAtendente, setDadosAtendimentos, dataConversas, instanceParam, loggedUserParam]);
    
    /*console.log("-----INICIO-----");
    console.log("conversaID: ", conversaID);
    console.log("dataConversas: ", dataConversas);*/
    
    useEffect( () => {
        novaMensagemSocket();
        departamentosEAtendentes();
        console.log("useEffect: ", conversaID, '-', conversaIdAnterior);
        if (conversaID != conversaIdAnterior) {
            encontrarAtendimentoPorChatId(conversaID);
            setConversaIdAnterior(conversaID);
        }
                
    }, [novaMensagemSocket, departamentosEAtendentes, encontrarAtendimentoPorChatId, conversaID, conversaIdAnterior, dataConversas]);
    
    /*console.log("dadosAtendimentos: ", dadosAtendimentos);
    console.log("-----FIM-----");*/
    // encontrarAtendimentoPorChatId(conversaID);

    const abreviaNome = (nome) => {
        if(nome && nome.length > 24) {
    
          return nome.substring(0, 20) + '...';
        }
    
        return nome;
    };
    
    const codDepartamentoSplit = dadosAtendimentos.mensagem?.split(',');
    // const codDepartamentoSplit = codDepartamento.split(',');
    
    if(atendenteLogado?.departamento?.includes(codDepartamentoSplit)) {
        setDepartamentoPermitido(true);
    } else {
        setDepartamentoPermitido(false);
    }

    /*console.log("-----REGRAS-----");
    console.log("1: ", dadosAtendimentos?.atendente, "-", loggedUserParam, "-", departamentoPermitido, "-", atendenteLogado?.id_group);
    console.log("2: ", !dadosAtendimentos.atendente, "-", departamentoPermitido);
    console.log("3: ", !dadosAtendimentos);
    console.log("fim: ", !dadosAtendimentos);*/

    return(
        <>
            {/* STUB --> MODAL PARA OPÇÕES DA CONVERSA */}
            <ModalOpcoes abrirModal={modalOpcoes} labelModal={'Opções'}>
                <ButtonPrimario onClick={() => {setModalAtendentes(true); setModalOpcoes(false);}}>Transferir Atendente</ButtonPrimario>
                <ButtonPrimario onClick={() => {setModalDepartamento(true); setModalOpcoes(false);}}>Transferir Departamento</ButtonPrimario>
            </ModalOpcoes>

            {/* STUB --> MODAL PARA OPÇÕES DE TRANFERÊNCIA DE ATENDENTE */}
            <ModalAtendentes abrirModal={modalAtendentes} labelModal={'Escolha um Atendente'}>
                {
                    atendentes?.map((data, index) => {
                        const codDepartamentoSplit = codDepartamento.split(',');
                        
                        if(data.active === "Y" && data?.departamento?.includes(codDepartamentoSplit)) {
                            return <ButtonPrimario onClick={() => {handleTransferirAtendente(data.login, data.name)}} key={index}>
                                        {data.name}
                                    </ButtonPrimario>
                        }
                    })
                }
            </ModalAtendentes>

            {/* STUB --> MODAL PARA OPÇÕES DE TRANFERÊNCIA DE DEPARTAMENTOS */}
            <ModalDepartamentos abrirModal={modalDepartamento} labelModal={'Escolha um Departamento'}>
                {
                    departamentos?.map((data, index) => {
                        return <ButtonPrimario onClick={() => {handleTransferirDepartamento(data.departamento, data.comando)}} key={index}>
                                    {data.departamento}
                                </ButtonPrimario>
                    })
                }
            </ModalDepartamentos>

            {/* STUB --> MODAL PARA OPÇÕES DE DEPARTAMENTOS PARA ABRIR ATENDIMENTO */}
            <ModalOpenCall abrirModal={modalOpenCall} labelModal={'Escolha um Departamento para Registrar'}>
                {
                    departamentos?.filter(depto => {
                        const codDepartamentosAtendente = atendenteLogado.departamento?.split(',').map(d => d.trim());
                        return codDepartamentosAtendente.some(cod => depto.comando === cod);

                    }).map((data, index) => (
                        <ButtonPrimario onClick={() => {handleAbrirAtendimento(data.departamento, data.comando)}} key={index}>
                            {data.departamento}
                        </ButtonPrimario>
                    ))
                }
            </ModalOpenCall>

            <HeaderContainer>
                <InfosContatoContainer>
                    <FotoPerfilContainer>
                        <FotoPerfil src={fotoPerfil && fotoPerfil !== "data:image/jpeg;base64," ? fotoPerfil : integra_image} alt="foto_perfil" />
                    </FotoPerfilContainer>

                    <DadosContatoContainer>
                        <NomeContato>{abreviaNome(nomeContato)}</NomeContato>
                        <NumeroTelefone><MdOutlinePhoneEnabled />{numeroDeTelefone}</NumeroTelefone>
                        <FilaAtendimento><MdQueue />{fila}</FilaAtendimento>
                        <FecharConversa onClick={() => fechaConversa()}>
                            <MdOutlineExitToApp />
                        </FecharConversa>
                    </DadosContatoContainer>
                </InfosContatoContainer>

                {   (dadosAtendimentos && dadosAtendimentos?.atendente === loggedUserParam) || 
                        (dadosAtendimentos && departamentoPermitido && atendenteLogado?.id_group === 2) ?
                    
                        <AcoesContainer>
                            <Opcoes onClick={() => setModalOpcoes(true)}>
                                <MdMoreHoriz />
                            </Opcoes>

                            <FecharAtendimento onClick={() => handleFecharAtendimento()}>
                                <MdClose /> Finalizar
                            </FecharAtendimento>
                        </AcoesContainer>

                    : dadosAtendimentos && !dadosAtendimentos.atendente && departamentoPermitido ? <BotaoAssumirAbrirAtendimento onClick={() => {handleAssumirAtendimento()}}>Assumir Atendimento</BotaoAssumirAbrirAtendimento>
                    : !dadosAtendimentos ? <BotaoAssumirAbrirAtendimento onClick={() => {setModalOpenCall(true); setModalOpcoes(false);}}>Abrir Atendimento</BotaoAssumirAbrirAtendimento> 
                    : <EmAtendimentoLabel>Em Atendimento</EmAtendimentoLabel> 

                    /*(possuiAtendente && possuiAtendente.login === loggedUserParam && !conversaIDContatos) || 
                        (possuiAtendente && !conversaIDContatos && atendenteLogado?.id_group === 2) ?

                        <AcoesContainer>
                            <Opcoes onClick={() => setModalOpcoes(true)}>
                                <MdMoreHoriz />
                            </Opcoes>

                            <FecharAtendimento onClick={() => handleFecharAtendimento()}>
                                <MdClose /> Finalizar
                            </FecharAtendimento>
                        </AcoesContainer>

                    : (!possuiAtendente && departamentoPermitido && !conversaIDContatos) ||
                        (!possuiAtendente && departamentoPermitido ) ? <BotaoAssumirAbrirAtendimento onClick={() => {handleAssumirAtendimento()}}>Assumir Atendimento</BotaoAssumirAbrirAtendimento>
                    : conversaIDContatos ? <BotaoAssumirAbrirAtendimento onClick={() => {setModalOpenCall(true); setModalOpcoes(false);}}>Abrir Atendimento</BotaoAssumirAbrirAtendimento> 
                    : <EmAtendimentoLabel>Em Atendimento</EmAtendimentoLabel>*/

                }
            </HeaderContainer>
        </>
    );
};

HeaderConversa.propTypes = {
    nomeContato: string.isRequired,
    fila: string,
    fotoPerfil: node,
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 120px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;

    background: ${props => props.theme.cores.cinza.cinza6};
    
    column-gap: 8px;
`;

const InfosContatoContainer = styled.div`
    display: flex;
`;

const FotoPerfilContainer = styled.div`
    width: 90px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
`;

const FotoPerfil = styled.img`
    width: 48px;
    height: 48px;
    
    border-radius: 50%;
`;

const DadosContatoContainer = styled.div`
    display: flex;
    flex-direction: column;

    row-gap: 4px;
`;

const NomeContato = styled.h1`
    ${props => props.theme.tipografia.body16bold};
    color: ${props => props.theme.cores.secundaria.preto};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body14bold};
    }
`;

const NumeroTelefone = styled.p`
    display: flex;
    align-items: center;

    ${props => props.theme.tipografia.body14regular};
    color: ${props => props.theme.cores.secundaria.preto};

    svg {
        margin-right: 4px;
    }

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body12regular};
    }
`;

const FilaAtendimento = styled.p`
    display: flex;
    align-items: center;

    ${props => props.theme.tipografia.body14regular};
    color: ${props => props.theme.cores.secundaria.preto};

    word-break: break-all;

    svg {
        margin-right: 4px;
    }
`;

const FecharConversa = styled.p`
    width: 40px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;

    cursor: pointer;

    background: ${props => props.theme.cores.auxiliares.laranja};

    svg {
        fill: ${props => props.theme.cores.secundaria.branco};
    }
`;

const AcoesContainer = styled.div`
    width: 100%;
    max-width: 200px;
    
    display: flex;
    justify-content: space-between;

    column-gap: 10px;

    @media (max-width: 768px) {
        max-width: 90px;

        flex-direction: column;
        justify-content: flex-end;

        row-gap: 6px;
    }
`;

const Opcoes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 6px 30px;

    background: ${props => props.theme.cores.primaria.primaria2};

    border-radius: 6px;

    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;

        fill: ${props => props.theme.cores.secundaria.branco};
    }

    @media (max-width: 768px) {
        width: 90px;
    }
`;

const FecharAtendimento = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.theme.tipografia.body14regular}

    color: ${props => props.theme.cores.secundaria.branco};

    padding: 6px 16px;

    background: ${props => props.theme.cores.alertas.perigo};

    border-radius: 6px;

    cursor: pointer;

    column-gap: 8px;

    svg {
        width: 20px;
        height: 20px;

        fill: ${props => props.theme.cores.secundaria.branco};
    }

    @media (max-width: 768px) {
        width: 90px;
    }
`;

const BotaoAssumirAbrirAtendimento = styled(ButtonPrimario)`
    width: 200px;

    background: ${props => props.theme.cores.auxiliares.verde};

    &:hover:not(:disabled) {
        color: ${props => props.theme.cores.secundaria.branco};
        background: ${props => props.theme.cores.primaria.primaria3};
    }

    @media (max-width: 768px) {
        width: 130px;
        ${props => props.theme.tipografia.body12regular};
    }
`;

const EmAtendimentoLabel = styled.p`
    padding: 10px;

    border-radius: 8px;

    ${props => props.theme.tipografia.body16bold}

    color: ${props => props.theme.cores.secundaria.preto};
    background: ${props => props.theme.cores.alertas.atencao};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body12regular}
    }
`;