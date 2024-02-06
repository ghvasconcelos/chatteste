// ANCHOR --> IMPORTS REACT
import { useContext } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS REACT ICONS MD
import { MdChat } from "react-icons/md";
// END REACT ICONS MD

export const BarraLateral = () => {

    const { modalFiltro, modalOpcoes, modalAtendentes, modalDepartamento } = useContext(VariaveisContext);

    return(
        <>
            <BarraLateralContainer $modalAberto={modalFiltro || modalOpcoes || modalAtendentes || modalDepartamento}>
                <MdChat />
            </BarraLateralContainer>
        </>
    );
};

const BarraLateralContainer = styled.div`
    width: 50px;
    height: 100%;

    display: flex;
    justify-content: center;

    background: ${props => props.theme.cores.cinza.cinza5};

    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    transition: .3s ease-in;

    filter: ${props => props.$modalAberto ? 'blur(10px)' : ''};

    svg {
        width: 24px;
        height: 24px;

        margin-top: 33px;
    }

    @media (max-width: 768px) {
        display: none;
    };
`;