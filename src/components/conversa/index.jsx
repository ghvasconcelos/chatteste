// IMPORTS REACT
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { VariaveisContext } from "../../context/VariaveisContext.jsx";
// END REACT

// ANCHOR --> IMPORTS COMPONENTS
import { HeaderConversa } from "../headerConversa";
import { FooterConversa } from "../footerConversa";
import { dateUltimaMensagem } from "../../helpers/fomatadores/formatadorData.js";
import { BoxMensagem } from "../boxMensagem";
// END COMPONENTS

// ANCHOR --> IMPORTS API
import integraAPI from "../../services";
// END API

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS


export const Conversa = () => {
    
    const { conversaID, nomeContato, fotoPerfil, filaAtendimento, modalFiltro, modalOpcoes, modalAtendentes, modalDepartamento, novaMensagem, instanceParam } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL PARA MARCAR UMA REF DA TELA, E UTILIZAR O `.current` PARA ROLAR PARA BAIXO AO CARREGAR MENSAGENS
    const baseTelaRef = useRef(null);

    // SECTION --> VARIAVEIS QUE RECEBEM OS DADOS MAPEADOS DA API
    const [dataMensagens, setDataMensagens] = useState();
    //console.log(setDataMensagens)
    // LINK --> REQUISIÇÃO PARA TRAZER MENSAGENS DA CONVERSA
    const handleConversas = useCallback( async () => {
      try {
          const numOfPages = 3;
          let allMessages = [];

          // STUB --> REQUISIÇÃO PARA MENSAGENS 
          for (let pageNumber = 1; pageNumber <= numOfPages; pageNumber++) {
              const res = await integraAPI.get(`messages/chat-id/${conversaID}`, {
                  params: {instance: instanceParam, page: pageNumber}
              })

              allMessages = allMessages.concat(res.data);
          }    
          
          // STUB --> AQUI ATRIBUO A RESPOSTA DA REQUISIÇÃO NA À VARIÁVEL
          setDataMensagens(allMessages);
      } catch(e) {
          console.log(e);
      }
      
  }, [conversaID, instanceParam]);
      
    
    
    useEffect(() => {
        // STUB --> 👇️ FAZ SCROLL PARA BAIXO SEMPRE QUE HÁ UMA NOVA MENSAGEM
      //  baseTelaRef.current?.scrollIntoView({behavior: 'auto'});
        
        novaMensagem
        
        // STUB --> FAZENDO REQUISIÇÃO PARA PEGAR TODAS AS CONVERSAS
        handleConversas();
        

       // window.scrollTo(-1, document.body.scrollHeight);
                
    }, [handleConversas, novaMensagem]);
   
    useEffect(() => {
       
        const timer = setTimeout(() => {
       
  
        baseTelaRef.current?.scrollIntoView({behavior: 'auto'});     
      }, 500);
  
      return () => clearTimeout(timer);
    },[dataMensagens]);
    console.log(dataMensagens)
    
    return(
        <>
            <ContainerConversa $modalAberto={modalFiltro}>
                <HeaderConversa fotoPerfil={fotoPerfil} nomeContato={nomeContato} fila={filaAtendimento} />
                    <BoxMensagemContainer $modalAberto={modalOpcoes || modalAtendentes || modalDepartamento}>
                        { 
                            dataMensagens?.map((data, index) => {
                            
                                return (
                                    <>
                                        <DivSeparação $remetente={data.rem_whats} key={index}>
                                            <BoxMensagem mensagem={data.mens_whats} quoteMens={data.quotemsg} nomeContato={data.quoteparticipant} nomeAtendente={data.nome_whats} horaMensagem={dateUltimaMensagem(data.hora_whats)} cliente={data.rem_whats} key={index} legenda_whats={data.legenda_whats} />
                                        </DivSeparação>
                                    </>
                                )
                            })
                        }

                    </BoxMensagemContainer>
                            
                <FooterConversa />
                        <ScrollBaixo ref={baseTelaRef} />
            </ContainerConversa>
        </> 
    );
};

const ContainerConversa = styled.div`
    width: 100%;
    height: 97vh;

    transition: .3s ease-in;

    filter: ${props => props.$modalAberto ? 'blur(10px)' : ''};

    @media (max-width: 768px) {
        height: 96vh;
    }
`;

const ScrollBaixo = styled.div``;

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

const DivSeparação = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    align-items: ${props => props.$remetente === "Cliente" ? 'start' : 'end'};
`;