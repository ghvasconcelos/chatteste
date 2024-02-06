// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from 'styled-components';
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS PROP TYPES
import { any } from 'prop-types';
// END PROPTYPES

export const DownloadDocumento = ({ arquivo }) => {

  return (
    <BotaoDownloadContainer >
        <BotaoDownload href={arquivo} download={"documento"} target="_blank">Baixar Documento</BotaoDownload>
    </BotaoDownloadContainer>
  );
};
DownloadDocumento.propTypes = {
    arquivo: any
};

const BotaoDownloadContainer = styled.div`
    width: 100%;
    `;

const BotaoDownload = styled.a`
    width: 100%;
    height: 48px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 4px;

    ${props => props.theme.tipografia.body16semibold};
    color: ${props => props.theme.cores.secundaria.branco};

    background-color: ${props => props.theme.cores.primaria.primaria3};

    cursor: pointer;

    column-gap: 8px;

    transition: .4s ease;

    &:hover:not(:disabled){
    background-color: ${props => props.theme.cores.primaria.primaria1};
    }

    &:disabled{
    pointer-events: none;
    background-color: ${props => props.theme.cores.cinza.cinza12};  
    color: ${props => props.theme.cores.cinza.cinza10};
    }

    svg {
    font-size: 24px;
    }
`;
const BoxMensagemContainer = styled.div`
    height: 100%;

    height: 84%;

    display: flex;
    flex-direction: column-reverse;
    
    overflow-y: scroll;

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
`;