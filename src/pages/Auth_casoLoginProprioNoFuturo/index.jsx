import styled from "styled-components";
import Labels from "../../components/labels/labels";
import { ButtonPrimario } from "../../components/buttons";
import { useContext, useState } from "react";
import { VariaveisContext } from "../../context/VariaveisContext";
import { localApi } from "../../services";


export const Auth = () => {

    const [login, setLogin] = useState();
    
    const { setUsuarioLogin} = useContext(VariaveisContext);

    const handleValores = (e) => {
        setLogin((prevValores) => ({
            ...prevValores,
            [e.target.name]: e.target.value
        }));
    }

    const logar = async () => {
        // STUB --> REQUISIÇÃO PARA Conversas
        await localApi.post(`login`, {usuario: login.usuario, senha: login.senha}).then(res => {setUsuarioLogin(res);});
    };

    return(
        <>
            <ContainerCard>
                <EmailInput>
                    <Labels title="E-Mail" $direcao={'row'} regular={true} subtitle={''} />
                    <InputTexto name="usuario" onChange={handleValores} />
                </EmailInput>

                <SenhaInput>
                    <Labels title="Senha" $direcao={'row'} regular={true} subtitle={''} />
                    <InputTexto name="senha" onChange={handleValores} />
                </SenhaInput>

                <BotaoEntrar onClick={logar}>Entrar</BotaoEntrar>
            </ContainerCard>
        </>
    );
};

const ContainerCard = styled.div`
    width: 500px;
    height: 300px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    margin: 160px auto 0 auto;

    padding: 20px;

    border-radius: 8px;

    background: ${props => props.theme.cores.primaria.primaria1};
`;

const EmailInput = styled.div`
    width: 100%;
`;

const SenhaInput = styled.div`
    width: 100%;

    margin-top: 30px;
`;

const BotaoEntrar = styled(ButtonPrimario)`
    margin-top: 30px;
    background: ${props => props.theme.cores.primaria.primaria2};
`;

const InputTexto = styled.input`
    width: 100%;
    
    padding: 8px;

    border-radius: 4px;

    background: ${props => props.theme.cores.bgColor.bgSelecionado};

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;