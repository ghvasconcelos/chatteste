 // ANCHOR --> IMPORT REACT
import { useContext } from "react";
// END REACT

// ANCHOR --> IMPORTS CONTEXT
import { VariaveisContext } from "../../context/VariaveisContext";
// END CONTEXT

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled, { css } from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS PROP TYPES
import { node, number, string } from "prop-types";
// END PROP TYPES

// ANCHOR --> IMPORTS REACT ICONS MD
import { MdEmojiPeople, MdPersonPin, MdQueue, MdFiberNew, MdOutlinePhoneEnabled } from "react-icons/md";
import MdAttenant from "../../assets/svg/aguard_atendente.svg";
import MdBot from "../../assets/svg/bot.svg";
// END REACT ICONS MD

// ANCHOR --> IMPORTS IMAGES
import logo from "../../assets/svg/whatsapp.svg";
import integra_image from "../../assets/img/ICONE_INTEGRA_IDEIAS_2_AZUL.png";
// END IMAGES


export const CardConversa = ({ fotoPerfil, whatsContato, nomeAtendente, horaMens, fila, status, chatID, departamentoCod, numeroTelefone, possuiAtendente, horaMensagem }) => {
    
    /* SECTION VARIAVEIS DO CONTEXT 
        // STUB --> setConversaID: VARIVEL VINDA DO CONTEXT PARA ATUALIZAR ID DA CONVERSA SELECIONADA
        // STUB --> SetConversaAberta: VARIÁVEL VINDA DO CONTEXT PARA FECHAR A CONVERSA
    */
    const { setConversaAberta, setConversaID, setConversaIDContatos, setNomeContato, setFilaAtendimento, setFotoPerfil, setAtendente, setCodDepartamento, setNumeroDeTelefone, setPossuiAtendente } = useContext(VariaveisContext);

    const abreviaNome = (nome) => {
        if(nome && nome.length > 24) {
    
          return nome.substring(0, 20) + '...';
        }
    
        return nome;
    };
        //horaMensagem
    return(
        <>
            { 
                <CardContainer onClick={() => { setConversaAberta(true); setConversaID(chatID); setConversaIDContatos(''); setNomeContato(whatsContato); setFilaAtendimento(fila); setFotoPerfil(fotoPerfil); setAtendente(nomeAtendente); setCodDepartamento(departamentoCod); setNumeroDeTelefone(numeroTelefone); setPossuiAtendente(possuiAtendente);}}>
                        <FotoPerfilContainer>
                            <FotoPerfil src={fotoPerfil && fotoPerfil !== "data:image/jpeg;base64," ? fotoPerfil : integra_image} alt="foto_perfil" />
                        </FotoPerfilContainer>

                        <DadosContainer>
                            <NomeHoraBox>
                                <NomeContato>{abreviaNome(whatsContato)}</NomeContato>
                                <HoraMensagem>{horaMens}</HoraMensagem>
                            </NomeHoraBox>

                            <FilaAtendimento><MdQueue />{abreviaNome(fila)}</FilaAtendimento>

                            <AtendenteOrigemBox>
                                <NomeAtendente><MdPersonPin />{abreviaNome(nomeAtendente)}</NomeAtendente>

                                <IconsContainer>
                                    <IconeOrigemAtendimento src={logo} alt="logo_origem" />
                                    <StatusConversa $status={status}>
                                        { 
                                            //"Aguardando Atendente"
                                            status ===  0  ?
                                            <MdWaitAttenant src={MdAttenant} alt="wait_attenant" /> :

                                            // "Novo Atendimento"
                                            status === 1 ?
                                            <MdFiberNew /> :

                                            //"Aguardando Cliente"
                                            status === 4 ? 
                                            <MdEmojiPeople/> :
                                                
                                            // "Bot"
                                            status === 5 ?
                                            <MdBotAtt src={MdBot} alt="bot" />
                                            
                                            : ''
                                        }
                                    </StatusConversa>
                                </IconsContainer>
                            </AtendenteOrigemBox>
                        </DadosContainer>
                </CardContainer>
            }
        </>
    );
};
CardConversa.propTypes = {
    whatsContato: string.isRequired,
    nomeAtendente: string,
    fila: string.isRequired,
    status: number,
    horaMens: string,
    horaMensagem: string,
    fotoPerfil: node,
    chatID: string,
    departamentoCod: string,
    numeroTelefone: string,
    possuiAtendente: string,
}

const CardContainer = styled.div`
    width: 100%;
    min-height: 78px;
    max-height: 130px;

    display: flex;
    align-items: center;

    border-radius: 6px;

    background: ${props => props.theme.cores.bgColor.bgSelecionado};

    cursor: pointer;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const FotoPerfilContainer = styled.div`
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
`;

const FotoPerfil = styled.img`
    width: 46px;
    height: 46px;
    
    border-radius: 50%;
`;

const DadosContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    
    padding: 0 10px;
    
    row-gap: 2px;
`;

const NomeHoraBox = styled.div`
    width: 100%;

    display: flex;

    justify-content: space-between;
    align-items: center;
`;

const HoraMensagem = styled.div`
    ${props => props.theme.tipografia.body14regular};
    color: ${props => props.theme.cores.secundaria.preto};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body12regular};
    }
`;

const NomeContato = styled.h1`
    ${props => props.theme.tipografia.body14bold};
    color: ${props => props.theme.cores.secundaria.preto};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body14bold};
    }
`;


const FilaAtendimento = styled.p`
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

const AtendenteOrigemBox = styled.div`
    display: flex;

    justify-content: space-between;
    align-items: center;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    
    column-gap: 8px;
`;

const NomeAtendente = styled.p`
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

const IconeOrigemAtendimento = styled.img`
    width: 16px;
    height: 16px;
`;

const StatusConversa = styled.div`
    width: 20px;
    height: 20px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    background: ${props => props.theme.cores.alertas.sucesso};

    svg {
        width: 14px;
        height: 14px;
    }

    ${props => props.$status === 4 && css` // AGUARDANDO CLIENTE
    background: ${props => props.theme.cores.alertas.sucesso};
    
    svg {
      fill: ${props => props.theme.cores.secundaria.preto};
    }
  `}

  ${props => props.$status === 0 && css` // AGUARDANDO ATENDENTE
    background: ${props => props.theme.cores.alertas.perigo};
    
    svg {
      fill: ${props => props.theme.cores.secundaria.branco};
    }
  `}

  ${props => props.$status === 1 && css` // NOVO ATENDIMENTO
    background: ${props => props.theme.cores.auxiliares.azul};
    
    svg {
      fill: ${props => props.theme.cores.secundaria.branco};
    }
  `}

  ${props => props.$status === 5 && css` // BOT
    background: ${props => props.theme.cores.auxiliares.roxo};
    
    svg {
      fill: ${props => props.theme.cores.secundaria.branco};
    }
  `}
`;

const MdWaitAttenant = styled.img`
    width: 16px;
    height: 16px;
`;

const MdBotAtt = styled.img`
    width: 16px;
    height: 16px;
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

// SECTION --> CARD DE CONTATOS
export const CardContatos = ({ fotoPerfil, whatsContato, chatIDContatos, numeroTelefone, fila }) => {
    
    /* SECTION VARIAVEIS DO CONTEXT 
        // STUB --> setConversaID: VARIVEL VINDA DO CONTEXT PARA ATUALIZAR ID DA CONVERSA SELECIONADA
        // STUB --> SetConversaAberta: VARIÁVEL VINDA DO CONTEXT PARA FECHAR A CONVERSA
    */
    const { setConversaAberta, setPossuiAtendente, setConversaID, setConversaIDContatos, setNomeContato, setFotoPerfil, setNumeroDeTelefone, setFilaAtendimento} = useContext(VariaveisContext);

    const abreviaNome = (nome) => {
        if(nome && nome.length > 24) {
    
          return nome.substring(0, 20) + '...';
        }
    
        return nome;
    };
    
    return(
        <>
            {
                <CardContainer onClick={() => {setConversaAberta(true); setPossuiAtendente(""); setConversaIDContatos(chatIDContatos); setConversaID(chatIDContatos); setNomeContato(whatsContato); setFotoPerfil(fotoPerfil); setNumeroDeTelefone(numeroTelefone); setFilaAtendimento(fila)}}>
                        <FotoPerfilContainer>
                            <FotoPerfil src={fotoPerfil && fotoPerfil !== "data:image/jpeg;base64," ? fotoPerfil : integra_image} alt="foto_perfil" />
                        </FotoPerfilContainer>

                        <DadosContainer>
                            <NomeHoraBox>
                                <NomeContato>{abreviaNome(whatsContato)}</NomeContato>
                            </NomeHoraBox>
                            <NumeroTelefone><MdOutlinePhoneEnabled />{numeroTelefone}</NumeroTelefone>
                        </DadosContainer>
                </CardContainer>
            }
        </>
    );
};
CardContatos.propTypes = {
    whatsContato: string.isRequired,
    fotoPerfil: node,
    chatIDContatos: string,
    numeroTelefone: string,
    fila: string,
}
