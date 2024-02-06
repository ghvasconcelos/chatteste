// ANCHOR --> IMPORTS REACT ROUTER
import { Link } from "react-router-dom";
// END REACT ROUTER

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS


// BOTÃO PRIMÁRIO GRANDE
export const ButtonPrimario = styled.button`
  width: 100%;
  height: 44px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${props => props.theme.tipografia.body16semibold};
  
  color: ${props => props.theme.cores.secundaria.branco};
  
  background-color: ${props => props.theme.cores.primaria.primaria1};
  
  border-radius: 4px;
  
  column-gap: 8px;
  
  cursor: pointer;

  transition: .2s ease-in;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.cores.primaria.primaria2};
    color: ${props => props.theme.cores.secundaria.preto};
  }

  &:disabled {
    pointer-events: none;
    background-color: ${props => props.theme.cores.cinza.cinza12};  
    color: ${props => props.theme.cores.cinza.cinza10};
  }

  svg {
    font-size: 24px;
  }
`;


export const ButtonPrimarioLink = styled(Link)`
  width: 100%;
  height: 50px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 4px;
  
  ${props => props.theme.tipografia.body16semibold};
  color: ${props => props.theme.cores.secundaria.branco};
  
  background-color: ${props => props.theme.cores.primaria.primaria1};
  
  cursor: pointer;
  
  column-gap: 8px;

  transition: .4s ease;
  
  &:hover:not(:disabled){
    background-color: ${props => props.theme.cores.primaria.primaria3};
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