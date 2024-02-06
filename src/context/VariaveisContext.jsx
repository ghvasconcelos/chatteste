// ANCHOR --> IMPORTS REACT
import { createContext, useState } from "react";
// END REACT

// ANCHOR --> IMPORTS PROP TYPES
import { any } from "prop-types";
// END PROP TYPES

export const VariaveisContext = createContext();

export const ContextProvider = ({children}) => {

    // SECTION --> VARIÁVEIS PARA GUARDAR INSTANCIA E USUARIO LOGADO DO PARÂMETRO
    const [ instanceParam, setInstanceParam ] = useState();
    const [ loggedUserParam, setLoggedUserParam ] = useState();

    // SECTION --> VARIÁVEL QUE GUARDA SE CONVERSA ESTA ABERTA
    const [conversaAberta, setConversaAberta] = useState(false);

    // SECTION --> VARIÁVEL QUE GUARDA TODOS OS CONVERSATIONS
    const [dataConversas, setDataConversas] = useState();
    //console.log(dataConversas)

    // SECTION --> VARIÁVEL PARA GUARDAR ID DA CONVERSA - REF
    const [conversaID, setConversaID] = useState('');
    const [conversaIDContatos, setConversaIDContatos] = useState(null);

    // SECTION --> VARIÁVEL PARA GUARDAR ID DA CONVERSA - REF
    const [codDepartamento, setCodDepartamento] = useState('');
    const [departamentoPermitido, setDepartamentoPermitido] = useState(false);

    // SECTION --> VARIÁVEIS CARREGANDO DADOS DA CONVERSA PARA O HEADER DA CONVERSA
    const [dadosAtendimentos, setDadosAtendimentos] = useState('');
    const [nomeContato, setNomeContato] = useState('');
    const [nomeAtendente, setAtendente] = useState('');
    const [possuiAtendente, setPossuiAtendente] = useState('');
    const [filaAtendimento, setFilaAtendimento] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [numeroDeTelefone, setNumeroDeTelefone] = useState('');

    // SECTION --> VARIÁVEL PARA ABRIR E FECHAR OS MODAIS
    const [modalFiltro, setModalFiltro] = useState(false);
    const [modalOpcoes, setModalOpcoes] = useState(false);
    const [modalAtendentes, setModalAtendentes] = useState(false);
    const [modalDepartamento, setModalDepartamento] = useState(false);
    const [modalOpenCall, setModalOpenCall] = useState(false);

    // SECTION --> VARIÁVEIS QUE GUARDAM CONVERSAS FILTRADAS
    const [ conversasFiltradas, setConversasFiltradas ] = useState();

    // SECTION --> VARIAVEIS PARA MONITORAR NOTIFICAÇÕES - RECEBE DADOS DO SOCKET (<Header />)
    const [novaMensagem, setNovaMensagem] = useState();
   

    // SECTION --> VARIAVEL QUE GUARDA DADOS DOS CONTATOS
    const [contatos, setContatos] = useState(null);

    // SECTION --> VARIAVEL PARA GUARDAR USUÁRIO LOGADO E ATENDENTE
    const [usuarioLogado, setUsuarioLogado] = useState();
    const [atendenteLogado, setAtendentesLogado] = useState();

    return(
        <VariaveisContext.Provider value={{ dadosAtendimentos, setDadosAtendimentos, conversaAberta, setConversaAberta, conversaID, setConversaID, filaAtendimento, setFilaAtendimento, nomeContato, setNomeContato, fotoPerfil, setFotoPerfil, nomeAtendente, setAtendente, modalFiltro, setModalFiltro, modalOpcoes, setModalOpcoes, conversasFiltradas, setConversasFiltradas, novaMensagem, setNovaMensagem, contatos, setContatos, dataConversas, setDataConversas, usuarioLogado, setUsuarioLogado, modalAtendentes, setModalAtendentes, modalDepartamento, setModalDepartamento, modalOpenCall, setModalOpenCall, codDepartamento, setCodDepartamento, numeroDeTelefone, setNumeroDeTelefone, possuiAtendente, setPossuiAtendente, departamentoPermitido, setDepartamentoPermitido, atendenteLogado, setAtendentesLogado, conversaIDContatos, setConversaIDContatos, instanceParam, setInstanceParam, loggedUserParam, setLoggedUserParam }}>
            {children}
        </VariaveisContext.Provider>
    );
};
ContextProvider.propTypes = {
    children: any,
}