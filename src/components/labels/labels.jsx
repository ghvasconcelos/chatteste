// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END SYLED COMPONENTS

// ANCHOR --> IMPORTS PROP TYPES
import { string, bool, object, number, element, oneOfType } from "prop-types";
// END PROP STYLES

export const LabelMainTituloBusca = ({label, children}) =>{
  return (
    <LabelMainTituloBuscaDiv>
      <LabelMainTituloBuscaH1>{label}</LabelMainTituloBuscaH1>
      {children}
    </LabelMainTituloBuscaDiv>
  )
}
LabelMainTituloBusca.propTypes = {
  label: string.isRequired,
  children: element
};

const LabelMainTituloBuscaDiv = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 366px;
  width: 100%;
`;

const LabelMainTituloBuscaH1 = styled.h1`
  background-color: transparent;
  color: ${props => props.theme.cores.cinza.cinza2};
  ${props => props.theme.tipografia.subTitulo1};
`;


// SECTION --> LABEL SEM ÁREA DE FUSÃO
export default function Labels(props) {
    return (
      <Label $direcao={props.$direcao === '' ? 'row' : props.$direcao}>
        <LabelTitle $regular={props.regular ? true : false}>{props.title}</LabelTitle>
        <LabelSubTitle>{props.subtitle}</LabelSubTitle>
      </Label>
    )
  }
  Labels.propTypes = {
    $direcao: string,
    regular: bool,
    title: string.isRequired,
    subtitle: oneOfType([string, object, number]),
  };
  
  const Label = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: ${props => props.$direcao};
    padding-right: 8px;
    margin-right: 8px;
    margin-bottom: 8px;
    gap: 8px;
    row-gap: 4px;
    
    &:first-child {
      padding-left: 0;
    }
  
    @media (max-width: 768px) {
      row-gap: 4px;
    }
  `;
  
  const LabelTitle = styled.h5`
    background-color: transparent;
    ${props => props.$regular ? props.theme.tipografia.body16regular : props.theme.tipografia.body16bold};
    color: ${props => props.theme.cores.cinza.cinza3};
    
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
  
      white-space: nowrap;
      ${props => props.regular ? props.theme.tipografia.body12regular : props.theme.tipografia.body12semibold};
    }
  `;
  
  const LabelSubTitle = styled.h5`
    background-color: transparent;
    ${props => props.theme.tipografia.body16regular};
    color: ${props => props.theme.cores.cinza.cinza3};
    
    @media (max-width: 768px) {
      white-space: break-spaces;
      ${props => props.theme.tipografia.body12regular};
    }
  `;