// ANCHOR --> IMPORTS REACT
import { useContext, useEffect } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS COMPONENTS
import { AudioInput, FileInput, MyDropzone, InputMensagem, InputMensagemComDropzone } from "../inputs";
// END COMPONENTS


export const FooterConversa = () => {

    const { modalOpcoes, modalAtendentes, modalDepartamento, dadosAtendimentos, atendenteLogado, departamentoPermitido, loggedUserParam } = useContext(VariaveisContext);

    return(
        <>
        {   (dadosAtendimentos && dadosAtendimentos?.atendente === loggedUserParam) || 
                (dadosAtendimentos && departamentoPermitido && atendenteLogado?.id_group === 2) ?
            
                <ContainerFooter $modalAberto={modalOpcoes || modalAtendentes || modalDepartamento}>
                    <FileInput />
                    <InputMensagem />
                    <AudioInput />
                </ContainerFooter>
            : dadosAtendimentos && !dadosAtendimentos.atendente && departamentoPermitido ? <AvisoDeAtendente>Assuma o atendimento para enviar uma mensagem!</AvisoDeAtendente>
            : !dadosAtendimentos ? <AvisoDeAtendente>Registre um atendimento para enviar uma mensagem!</AvisoDeAtendente>
            : <AvisoDeAtendente>Aguarde o fim do atendimento atual ou solicite a transferência para o seu usuário!</AvisoDeAtendente>
            
            /*(possuiAtendente && possuiAtendente.login === loggedUserParam && !conversaIDContatos) || 
                (possuiAtendente && !conversaIDContatos && atendenteLogado?.id_group === 2) ?

            <ContainerFooter $modalAberto={modalOpcoes || modalAtendentes || modalDepartamento}>
                <FileInput />
                <InputMensagem />
                <AudioInput />
            </ContainerFooter>

            : !possuiAtendente && departamentoPermitido && !conversaIDContatos ? <AvisoDeAtendente>Assuma o atendimento para enviar uma mensagem!</AvisoDeAtendente>
            : conversaIDContatos ? <AvisoDeAtendente>Registre um atendimento para enviar uma mensagem!</AvisoDeAtendente>
            : <AvisoDeAtendente>Aguarde o fim do atendimento atual ou solicite a transferência para o seu usuário!</AvisoDeAtendente>*/
        }
        </>
    );
};

const ContainerFooter = styled.div`
    width: 100%;

    display: flex;

    background: ${props => props.theme.cores.cinza.cinza6};

    border-top-right-radius: 8px;

    transition: .3s ease-in;

    filter: ${props => props.$modalAberto ? 'blur(10px)' : ''};
`

const AvisoDeAtendente = styled.p`
    width: 100%;
    height: 64px;

    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: ${props => props.theme.cores.secundaria.preto};

    ${props => props.theme.tipografia.body18bold};
    background: ${props => props.theme.cores.cinza.cinza6};

    @media (max-width: 768px) {
        height: 52px;

        text-align: center;
        ${props => props.theme.tipografia.body12regular};
    }
`;