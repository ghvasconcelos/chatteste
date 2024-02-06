// ANCHOR --> IMPORTS REACT
import { useState, useCallback, useContext, useEffect } from "react";
import { VariaveisContext } from "../../context/VariaveisContext.jsx";
// END REACT

// ANCHOR --> STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS COMPONENTS
import { CardContatos, CardConversa } from "../cardConversa";
import { ButtonPrimario } from "../buttons";
import { InputBusca } from "../inputs";
import { ModalStatus } from "../modal/index.jsx";
import { dateUltimaMensagem } from "../../helpers/fomatadores/formatadorData.js";
// END COMPONENTS 

// ANCHOR --> IMPORT SVG ICONS
import IconMyAt from "../../assets/svg/iconMyAt.jsx";
import IconNewAt from "../../assets/svg/iconNewAt.jsx";
import IconAllAt from "../../assets/svg/iconAllat.jsx";
import IconWaitAt from "../../assets/svg/iconWaitAt.jsx";
import IconBot from "../../assets/svg/iconBot.jsx";
import IconWaitClient from "../../assets/svg/iconWaitClient.jsx";
//END IMPORT SVG ICONS

// ANCHOR --> IMPORTS REACT ICONS MD
import { MdFilterList } from "react-icons/md";
// END REACT ICONS MD

// ANCHOR --> IMPORTS SERVICES
import integraAPI from "../../services/index.js";
// END API


export const BarraConversas = () => {

    // SECTION --> VARIAVEL PARA ABRIR E FECHAR MODAIS
    const { modalFiltro, setModalFiltro, modalOpcoes, modalAtendentes, modalDepartamento, instanceParam, loggedUserParam
    } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL QUE VEM DO CONTEXT PARA ABRIR UMA CONVERSA
    const { conversaAberta } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL QUE VEM DO CONTEXT COM TODAS AS CONVERSAS FILTRADAS
    const { conversasFiltradas } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL VINDA DO CONTEXT COM A LISTAGEM DE CONTATOS
    const { contatos } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL PARA CAPTURAR RESULTADO DA REQUISIÇÃO
    const { dataConversas, setDataConversas } = useContext(VariaveisContext);
  
    // SECTION --> VARIAVEL PARA CAPTURAR ÚLTIMA RESPOSTA DA API DAS CONVERSAS
    const [ultimaRespostaConversas, setUltimaRespostaConversas] = useState([]);


    // SECTION --> VARIÁVEL QUE GUARDA TEMPO DE RELOAD
    const reload = 15_000;
    
    // LINK --> REQUISIÇÃO PARA TRAZER Conversas
    const handleTodasConversas = useCallback( async () => {
        try {
        
            // STUB --> REQUISIÇÃO PARA CONVERSAS
            const response = await integraAPI.get("conversations", {params: {instance: instanceParam, logged_user: loggedUserParam}})
            const dadosConversas = response.data;
            
            if (JSON.stringify(dadosConversas) !== JSON.stringify(ultimaRespostaConversas)) {
                setDataConversas(dadosConversas);
                setUltimaRespostaConversas(dadosConversas);
            }
        }
        catch(e) {
            console.log(e);
        }
    }, [setDataConversas, setUltimaRespostaConversas, ultimaRespostaConversas, instanceParam, loggedUserParam]);

    const handleTodasConversasFiltro = useCallback( async () => {
        try {
        
            // STUB --> REQUISIÇÃO PARA CONVERSAS
            const response = await integraAPI.get("conversations", {params: {instance: instanceParam, logged_user: loggedUserParam}})
            const dadosConversas = response.data;
            
               setDataConversas(dadosConversas);
               setUltimaRespostaConversas(dadosConversas);
        }
        catch(e) {
            console.log(e);
        }
    }, [setDataConversas, setUltimaRespostaConversas, ultimaRespostaConversas]);
    
    const handleConversasFiltradas = async (status) => {
        try {
            // STUB --> REQUISIÇÃO PARA FILTRAR CONVERSAS
            await integraAPI.get(`conversations/status/${status}`, {params: {instance: instanceParam, logged_user: loggedUserParam}})
            .then((res) => {
                // STUB --> AQUI ATRIBUO A RESPOSTA DA REQUISIÇÃO NA À VARIÁVEL
                setDataConversas(res.data);
                
            });
            
        } catch(e) {
            console.log(e);
        }
    };

    const handleMeusAtendimentos = async () => {
            // STUB --> REQUISIÇÃO PARA FILTRAR CONVERSAS
            await integraAPI.get(`conversations/clerk-user/${loggedUserParam}`, {params: {instance: instanceParam, logged_user: loggedUserParam}})
            .then((res) => {
                // STUB --> AQUI ATRIBUO A RESPOSTA DA REQUISIÇÃO NA À VARIÁVEL
                setDataConversas(res.data);
            });
    };

    // SECTION --> UseEffect para buscar novos dados a cada 10 segundos
    useEffect(() => {
        handleTodasConversas();  // Chama imediatamente ao montar

        const interval = setInterval(() => {
            handleTodasConversas();  // Atualiza a cada 'reload' milissegundos
        }, reload);

        return () => clearInterval(interval);  // Limpeza ao desmontar
    }, [handleTodasConversas, reload]);

    // SECTION --> EXECUTA REQUISIÇÃO AO MONTAR O COMPONENTE
    /*useEffect(() => {
        handleTodasConversas();

    }, [handleTodasConversas]);*/
    // FIM REQUISIÇÃO DE CONVERSAS
    return(
        <>
            {/* STUB --> MODAL PARA FILTROS DE STATUS */}
            <ModalStatus abrirModal={modalFiltro} labelModal={'Status'}>
                <ButtonPrimario onClick={() => { handleTodasConversasFiltro([]); setModalFiltro(false); }}>
                <IconAllAt /> Todos
                </ButtonPrimario>
                <ButtonPrimario onClick={() => {handleMeusAtendimentos(); setModalFiltro(false);}}><IconMyAt />Meus Atendimentos</ButtonPrimario>
                <ButtonPrimario onClick={() => {handleConversasFiltradas('0'); setModalFiltro(false);}}><IconWaitAt />Aguardando Atendente</ButtonPrimario>
                <ButtonPrimario onClick={() => {handleConversasFiltradas('1'); setModalFiltro(false);}}><IconNewAt />Novo Atendimento</ButtonPrimario>
                <ButtonPrimario onClick={() => {handleConversasFiltradas('4'); setModalFiltro(false);}}><IconWaitClient />Aguardando Cliente</ButtonPrimario>
                <ButtonPrimario onClick={() => {handleConversasFiltradas('5'); setModalFiltro(false);}}><IconBot />Bot</ButtonPrimario>
            </ModalStatus>

            <BarraConversasContainer $mobile={conversaAberta} $modalAberto={modalFiltro || modalOpcoes || modalAtendentes || modalDepartamento}>
                <TituloFiltosContainer>
                    <TituloConversas>Conversas</TituloConversas>
                    <MdFilterList style={{cursor: "pointer"}} onClick={() => setModalFiltro(true)} />

                </TituloFiltosContainer>
                
                <InputBusca conversas={dataConversas} />

                {
                    conversasFiltradas?.length ?                     
                    conversasFiltradas?.map((data, index) => {
                        return <CardConversa 
                                    whatsContato={data.contactItem.nome || data.contactItem.nome_whats} 
                                    fila={data.departmentItem.departamento} 
                                    nomeAtendente={data?.userItem?.name} 
                                    possuiAtendente={data.userItem}
                                    horaMens={dateUltimaMensagem(data.dt_ultmsg_cli)} 
                                    status={data.statusItem.numero_status} 
                                    fotoPerfil={data.contactItem.img_perfil} 
                                    chatID={data.chat_id} 
                                    numeroTelefone={data.celular}
                                    usuarioLogado={data?.userItem?.usr_logado}
                                    departamentoCod={data.mensagem}
                                    key={index} 
                                />
                    })
                    
                    : 

                    !conversasFiltradas ? 
                    
                    dataConversas?.map((data, index) => {
                        return <CardConversa 
                                    whatsContato={data.contactItem.nome || data.contactItem.nome_whats} 
                                    fila={data.departmentItem.departamento} 
                                    nomeAtendente={data?.userItem?.name} 
                                    possuiAtendente={data.userItem}
                                    horaMens={dateUltimaMensagem(data.dt_ultmsg_cli)} 
                                    status={data.statusItem.numero_status} 
                                    fotoPerfil={data.contactItem.img_perfil} 
                                    chatID={data.chat_id} 
                                    numeroTelefone={data.celular}
                                    usuarioLogado={data?.userItem?.usr_logado}
                                    departamentoCod={data.mensagem}
                                    key={index}
                                /> 
                    
                    }) : <NenhumResultadoEncontrado>Não há conversas para este filtro</NenhumResultadoEncontrado>
                }
                                    
                { !contatos?.length ?  ''
                    
                    : 

                    <TituloFiltosContainer>
                        <TituloConversas>Contatos</TituloConversas>
                    </TituloFiltosContainer>
                }

                {
                    contatos?.length != 0 ? 
                    
                    contatos?.map((data, index) => {
                        return <CardContatos 
                                    whatsContato={data.nome || data.nome_whats} 
                                    fila="Contato"
                                    fotoPerfil={data.img_perfil} 
                                    chatIDContatos={data.chat_id} 
                                    numeroTelefone={data.telefone}
                                    key={index} 
                                /> 
                    
                    })

                    : ''
                }
            </BarraConversasContainer>
        </>
    );
};

const BarraConversasContainer = styled.div`
    width: 480px;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;
    
    padding: 10px;
    
    background: ${props => props.theme.cores.cinza.cinza6};
    
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    
    row-gap: 16px;

    transition: .3s ease-in;

    filter: ${props => props.$modalAberto ? 'blur(10px)' : ''};

    &::-webkit-scrollbar{
      padding-right: 2px;
      width: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb{
      border-radius: 8px;
      background: ${props => props.theme.cores.cinza.cinza3};
    }

    @media (max-width: 768px) {
        width: 100%;
        border-radius: 8px;

        display: ${props => props.$mobile ? 'none' : ''};
    }
`;

const TituloFiltosContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 26px;

    svg {
        width: 22px;
        height: 22px;
    }
`;

const TituloConversas = styled.h1`
    ${props => props.theme.tipografia.body24bold};
    color: ${props => props.theme.cores.secundaria.preto};
`;

const NenhumResultadoEncontrado = styled.p`
    background: ${props => props.theme.cores.primaria.primaria2};
    
    margin-top: 20px;
    padding: 8px;
    
    color: ${props => props.theme.cores.secundaria.branco};

    border-radius: 8px;

    text-align: center;

`;
