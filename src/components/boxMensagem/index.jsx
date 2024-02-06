// ANCHOR --> IMPORTS PROP TYPE
import { oneOfType, string, element } from "prop-types";
// END PROP TYPE
import React, { useState, useEffect } from 'react';

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
import { DownloadDocumento } from "../downloadDocumento";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS IMAGES
// import foto from "../../assets/img/1.png";
// END IMAGES


// SECTION --> BOX DO ATENDENTE

export const BoxMensagem = ({ mensagem, horaMensagem, quoteMens, nomeContato, nomeAtendente, cliente, legenda_whats, dataMensagens }) => {
    const ResponderButton = ({ onClick }) => {
      return <Button onClick={onClick}>Responder</Button>;
    };
  
    const MensagemComVCard = ({ mensagem }) => {
      const [nomeMostrar, setNomeMostrar] = useState('');
      const [numeroMostrar, setNumeroMostrar] = useState('');
  
      useEffect(() => {
        const extrairInformacoesVCard = (vCardText) => {
          const regexFN = /FN:(.*?)\n/;
          const regexTEL = /TEL;type=CELL;waid=(.*?):/;
          const matchFN = vCardText.match(regexFN);
          const matchTEL = vCardText.match(regexTEL);
  
          if (matchFN) {
            setNomeMostrar(matchFN[1]);
          }
          if (matchTEL) {
            setNumeroMostrar(matchTEL[1]);
          }
        };
  
        extrairInformacoesVCard(mensagem);
      }, [mensagem]);
  
      return (
        <div>
          <p>Nome: {nomeMostrar}</p>
          <p>Número: {numeroMostrar}</p>
        </div>
      );
    };
  
    return (
      <>
        {dataMensagens?.map((data) => {
          const idMensagem = data.id_mensagem;
          console.log(idMensagem);
        })}
  
        <ContainerMensagensAtendente $cliente={cliente}>
          <NomeAtendente $cliente={cliente}>{nomeAtendente}</NomeAtendente>
  
          {quoteMens ? (
            // Tratativa para mensagem citada
            <ContainerRespostaAtendente>
              <DadosResposta>
                <NomeContato>{nomeContato}</NomeContato>
                <MensagemCitada>{quoteMens}</MensagemCitada>
              </DadosResposta>
  
              {quoteMens.includes("data:image/png;base64") || quoteMens.includes("data:image/jpeg;base64") ? (
                <PreviewImagem src={quoteMens} alt="preview_imagem" />
              ) : (
                ''
              )}
            </ContainerRespostaAtendente>
          ) : (
            ''
          )}
  
          <TextoMenssagemAtendente $cliente={cliente}>
            {mensagem.includes("BEGIN:VCARD") ? (
              <MensagemComVCard mensagem={mensagem} />
            ) : mensagem.includes("data:application/") ? (
              // Tratativa para arquivos PDF
              <ContainerRespostaAtendente>
                <DownloadDocumento arquivo={mensagem} />
                <LegendaImagemContainer>
                  <LegendaTexto>{legenda_whats}</LegendaTexto>
                </LegendaImagemContainer>
              </ContainerRespostaAtendente>
            ) : mensagem.includes('data:image/') ? (
              // Tratativa para imagens
              <>
                <ContainerRespostaAtendente>
                  <PreviewImagemContainer>
                    <PreviewImagem src={mensagem} alt="preview_imagem" />
                    <LegendaImagemContainer>
                      <LegendaTexto>{legenda_whats}</LegendaTexto>
                    </LegendaImagemContainer>
                  </PreviewImagemContainer>
                </ContainerRespostaAtendente>
              </>
            ) : mensagem.includes("data:video") ? (
              // Tratativa para vídeos
              <MensagemComVideoAtendente width={"100%"} controls>
                <MensagemDeVideo src={mensagem} type="video/mp4" />
              </MensagemComVideoAtendente>
            ) : mensagem.includes("codecs=opus;base64") ? (
              // Tratativa para áudios
              <MensagemDeAudio controls>
                <source src={mensagem}></source>
              </MensagemDeAudio>
            ) : mensagem.includes("data:audio/") ? (
              // Tratativa para áudios
              <MensagemDeAudio controls>
                <source src={mensagem}></source>
              </MensagemDeAudio>
            ) : (
              mensagem
            )}
          </TextoMenssagemAtendente>
  
          <ContainerHoraMensagem>
            <HoraMensagemAtendente $cliente={cliente}>{horaMensagem}</HoraMensagemAtendente>
          </ContainerHoraMensagem>
        </ContainerMensagensAtendente>
        <ResponderButton />
      </>
    );
  };
  

BoxMensagem.propTypes = {
    nomeContato: string,
    nomeAtendente: string,
    mensagem: oneOfType([string, element]),
    quoteMens: oneOfType([string, element]),
    horaMensagem: string,
    cliente: string,
};


const ContainerMensagensAtendente = styled.div`
    width: 100%;
    max-width: 380px;

    padding: 10px;

    margin: 8px 14px;

    border-radius: 8px;
    
    background: ${props => props.$cliente === "Cliente" ? props.theme.cores.primaria.primaria2: props.theme.cores.cinza.cinza6};

    @media (max-width: 768px) {
        width: 100%;
        max-width: 300px;
    }
`;

const NomeAtendente = styled.p`
    display: ${props => props.$cliente === "Cliente" ? "none" : "" };
    
    ${props => props.theme.tipografia.body16bold};
    color: ${props => props.$cliente === "Cliente" ? props.theme.cores.secundaria.branco : props.theme.cores.secundaria.preto};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body14bold};
    }
`;

const ContainerHoraMensagem = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const DadosResposta = styled.div`
    display: flex;
    flex-direction: column;

    padding: 6px 0;
`;

const NomeContato = styled.p`
    margin-left: 8px;

    ${props => props.theme.tipografia.body14bold};
    color: ${props => props.theme.cores.auxiliares.verde};
`;

const MensagemCitada = styled.p`
    width: 100%;
    max-width: 230px;

    margin-left: 8px;

    ${props => props.theme.tipografia.body14regular};
    color: ${props => props.theme.cores.secundaria.preto};
`;

//const PreviewImagem = styled.img`
//    width: 80px;

//    border-radius: 4px;

//    border: 1px solid green;
//`;

const TextoMenssagemAtendente = styled.h1`
    display: flex;
    white-space: pre-line;
    margin-top: 4px;
    
    ${props => props.theme.tipografia.body18regular};
    color: ${props => props.$cliente === "Cliente" ? props.theme.cores.secundaria.branco : props.theme.cores.secundaria.preto};
    
    word-break: break-word;
    
    img {
        width: 354px;

        margin: 0 auto;
        
        @media (max-width: 768px) {
            width: 280px;
        }
    }

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body14regular};
    }
`;

const HoraMensagemAtendente = styled.p`
    margin-top: 4px;

    ${props => props.theme.tipografia.body14regular};
    color: ${props => props.$cliente === "Cliente" ? props.theme.cores.secundaria.branco : props.theme.cores.secundaria.preto};

    @media (max-width: 768px) {
        ${props => props.theme.tipografia.body12regular};
    }
`;

const ContainerRespostaAtendente = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: space-between;

    margin-top: 4px;

    border-radius: 5px;
    align-items: flex-start;
    flex-direction: column;
    
`;

const MensagemComImagemAtendente = styled.img`
    border-radius: 8px;  
`;
const LegendaImagem = styled.p `
    width: 100%;
        
    display: flex;
    justify-content: space-between;

    margin-top: 4px;

    border-radius: 4px;
    border-left: 6px solid ${props => props.theme.cores.auxiliares.verde};

    background: ${props => props.theme.cores.cinza.cinza2};
`;



const MensagemDeAudio = styled.audio``;

const MensagemComVideoAtendente = styled.video`
    border-radius: 8px;  
`;

const MensagemDeVideo = styled.source``;

const PreviewImagemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewImagem = styled.img`
  width: 80px;
  border-radius: 4px;
 
`;

const LegendaImagemContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  border-radius: 4px;
  
  background: ${props => props.theme.cores.cinza.cinza2};
`;

const LegendaTexto = styled.p`
  margin-left: 8px;
  
  ${props => props.theme.tipografia.body16regular};
  color: ${props => props.theme.cores.secundaria.preto};
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.cores.auxiliares.azul};
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
`;