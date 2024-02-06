// ANCHOR --> IMPORTS REACT
import { useContext } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS STYLED
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS IMAGES
import logo from "../../assets/img/ICONE_INTEGRA_IDEIAS_2_AZUL.png";
// END IMAGES

// ANCHOR --> IMPORTS IMAGES
import { MdLock } from "react-icons/md";
// END IMAGES


export const TelaInicial = () => {

    const { modalFiltro, modalOpcoes } = useContext(VariaveisContext);

    return(
        <>
            <TelaIncialContainer $modalAberto={modalFiltro || modalOpcoes}>
                <InfoCotainer>
                    <LogoIntegra src={logo} alt="Logo Integra"/>
                    <TitleIncial>IntegraChat</TitleIncial>
                    <TextoDescricao>Selecione uma conversa para continuar.</TextoDescricao>
                    <TextoDescricao>Comunique-se de forma rápida e simples, utilizando funções únicas que oferecemos.</TextoDescricao>
                </InfoCotainer>

                <TextoSeguro><MdLock /> Chat Seguro</TextoSeguro>
            </TelaIncialContainer>
        </>
    );
};

const TelaIncialContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    transition: .3s ease-in;

    filter: ${props => props.$modalAberto ? 'blur(10px)' : ''};

    @media (max-width: 768px) {
        display: none;
    }
`;

const InfoCotainer = styled.div`
    width: 100%;
    max-width: 786px;

    padding: 200px 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    row-gap: 10px;

    @media (max-width: 768px) {
        padding: 96px 0;
    }
`

const LogoIntegra = styled.img`
    width: 170px;
    height: 170px;
`;

const TitleIncial = styled.h1`
    ${props => props.theme.tipografia.tituloh5}
    color: ${props => props.theme.cores.secundaria.preto};
    
`;

const TextoDescricao = styled.p`
    padding: 0 15px;
    
    ${props => props.theme.tipografia.body20regular};
    color: ${props => props.theme.cores.cinza.cinza4};

    text-align: center;

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body18regular};
    }
`;

const TextoSeguro = styled.p`
    display: flex;
    align-items: center;

    ${props => props.theme.tipografia.body20regular};
    color: ${props => props.theme.cores.cinza.cinza4};

    column-gap: 4px;

    svg {
        width: 24px;
        height: 24px;
    }

    @media (max-width: 768px) {
        margin-bottom: 14px;
        ${props => props.theme.tipografia.body18regular};
    }
`;