// ANCHOR --> IMPORTS PROP TYPES
import { string } from "prop-types";
// END PROP TYPES

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS COMPONENTS
import { ButtonPrimarioLink } from "../../components/buttons";
// END COMPONENTS

// ANCHOR --> IMPORTS IMAGES
import Logo from "../../assets/img/LOGOTIPO_INTEGRA_IDEIAS.png";
// END IMAGES

export const NotFound = ({to = '#'}) => {

  return (
    <NotFoundMain>
      <LogoIntegra src={Logo} />
      <NotFoundDiv>
        <NotFoundH1>404</NotFoundH1>
        <NotFoundP>Pedimos desculpas! Não foi possível encontrar a página que você estava procurando ou sua sessão foi desconectada.</NotFoundP>
      </NotFoundDiv>

      <BotaoVoltar to={to}>Realize novamente o Login no painel!</BotaoVoltar>
    </NotFoundMain>
  );
}
  
NotFound.propTypes = {
  to: string.isRequired,
};

  
const NotFoundMain = styled.div`
  width: 100%;
  height: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 28px;
`;

const LogoIntegra = styled.img`
  height: 90px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    height: 73px;
  }
`;

const NotFoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 679px;
`;

const NotFoundH1 = styled.h1`
  ${props => props.theme.tipografia.tituloh4};
  font-size: 116px;
  color: ${props => props.theme.cores.secundaria.preto};
`;

const NotFoundP = styled.p`
  text-align: center;
  ${props => props.theme.tipografia.subTitulo2};
  color: ${props => props.theme.cores.secundaria.preto};
`;

const BotaoVoltar = styled(ButtonPrimarioLink)`
  width: 296px;
  margin-top: 30px;

  color: ${props => props.theme.cores.secundaria.branco};
`;