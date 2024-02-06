// ANCHOR --> IMPORTS REACT
import { useContext } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS REACT ICONS
import { MdClose } from "react-icons/md";
// END REACT ICONS

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS PROP TYPES
import { arrayOf, bool, element, string } from "prop-types";
// END PROP TYPES


// SECTION --> MODAL PARA FILTRO DE STATUS
export const ModalStatus = ({ abrirModal, labelModal, children }) => {

    const { setModalFiltro } = useContext(VariaveisContext);

    return(
        <>
            { abrirModal && 
                <ModalContainer>
                    <HeaderModal>
                        <Label>{labelModal}</Label>
                        <MdClose onClick={() => setModalFiltro(false)} />
                    </HeaderModal>
                    
                    <OptionsContainer>
                        {children}
                    </OptionsContainer>
                </ModalContainer>
            }
        </>
    );
};
ModalStatus.propTypes = {
    abrirModal: bool,
    labelModal: string,
    children: arrayOf(element),
};

const ModalContainer = styled.div`
    width: 100%;
    max-width: 400px;

    display: flex;
    flex-direction: column;

    padding: 20px;

    background: ${props => props.theme.cores.cinza.cinza1};
    
    position: absolute;
    
    top: 20%;
    left: 44%;

    border-radius: 8px;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    z-index: 1;

    overflow-y: scroll;

    svg {
        width: 30px;
        height: 30px;

        cursor: pointer;
    }

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
        width: 340px;

        top: 30%;
        left: 6%;
    }
`;

const HeaderModal = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 20px;

    row-gap: 10px;
`;

const Label = styled.p`
    ${props => props.theme.tipografia.body18regular};
    color: ${props => props.theme.cores.secundaria.preto};
`;


// SECTION --> MODAL PARA AÇÕES DA CONVERSA
export const ModalOpcoes = ({ abrirModal, labelModal, children }) => {

    const { setModalOpcoes } = useContext(VariaveisContext);

    return(
        <>
            { abrirModal && 
                <ModalContainer>
                    <HeaderModal>
                        <Label>{labelModal}</Label>
                        <MdClose onClick={() => setModalOpcoes(false)} />
                    </HeaderModal>
                    
                    <OptionsContainer>
                        {children}
                    </OptionsContainer>
                </ModalContainer>
            }
        </>
    );
};
ModalOpcoes.propTypes = {
    abrirModal: bool,
    labelModal: string,
    children: arrayOf(element),
};


// SECTION --> MODAL PARA TRANSFERÊNCIA DE ATENDENTES
export const ModalAtendentes = ({ abrirModal, labelModal, children }) => {

    const { setModalAtendentes } = useContext(VariaveisContext);

    return(
        <>
            { abrirModal && 
                <ModalAtendentesContainer>
                    <HeaderModal>
                        <Label>{labelModal}</Label>
                        <MdClose onClick={() => setModalAtendentes(false)} />
                    </HeaderModal>
                    
                    <OptionsContainer>
                        {children}
                    </OptionsContainer>
                </ModalAtendentesContainer>
            }
        </>
    );
};
ModalAtendentes.propTypes = {
    abrirModal: bool,
    labelModal: string,
    children: arrayOf(element),
};

const ModalAtendentesContainer = styled.div`
    width: 100%;
    max-width: 400px;

    max-height: 100vh;
    height: 450px;
    
    display: flex;
    flex-direction: column;

    padding: 20px;

    background: ${props => props.theme.cores.cinza.cinza1};
    
    position: absolute;
    
    top: 20%;
    left: 44%;

    border-radius: 8px;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    z-index: 1;

    overflow-y: scroll;

    svg {
        width: 30px;
        height: 30px;

        cursor: pointer;
    }

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
        width: 340px;

        top: 30%;
        left: 6%;
    }
`;


// SECTION --> MODAL PARA TRANSFERÊNCIA DE DEPARTAMENTOS
export const ModalDepartamentos = ({ abrirModal, labelModal, children }) => {

    const { setModalDepartamento } = useContext(VariaveisContext);

    return(
        <>
            { abrirModal && 
                <ModalDepartamentosContainer>
                    <HeaderModal>
                        <Label>{labelModal}</Label>
                        <MdClose onClick={() => setModalDepartamento(false)} />
                    </HeaderModal>
                    
                    <OptionsContainer>
                        {children}
                    </OptionsContainer>
                </ModalDepartamentosContainer>
            }
        </>
    );
};
ModalDepartamentos.propTypes = {
    abrirModal: bool,
    labelModal: string,
    children: arrayOf(element),
};

const ModalDepartamentosContainer = styled.div`
    width: 100%;
    max-width: 400px;

    max-height: 100vh;
    height: 500px;
    
    display: flex;
    flex-direction: column;

    padding: 20px;

    background: ${props => props.theme.cores.cinza.cinza1};
    
    position: absolute;
    
    top: 20%;
    left: 44%;

    border-radius: 8px;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    z-index: 1;

    overflow-y: scroll;

    svg {
        width: 30px;
        height: 30px;

        cursor: pointer;
    }

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
        width: 340px;

        top: 30%;
        left: 6%;
    }
`;

// SECTION --> MODAL PARA ESCOLHER DEPARTAMENTO PARA REGISTRAR ATENDIMENTO
export const ModalOpenCall = ({ abrirModal, labelModal, children }) => {

    const { setModalOpenCall } = useContext(VariaveisContext);

    return(
        <>
            { abrirModal && 
                <ModalDepartamentosContainer>
                    <HeaderModal>
                        <Label>{labelModal}</Label>
                        <MdClose onClick={() => setModalOpenCall(false)} />
                    </HeaderModal>
                    
                    <OptionsContainer>
                        {children}
                    </OptionsContainer>
                </ModalDepartamentosContainer>
            }
        </>
    );
};
ModalOpenCall.propTypes = {
    abrirModal: bool,
    labelModal: string,
    children: arrayOf(element),
};

