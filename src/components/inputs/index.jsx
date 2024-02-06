// ANCHOR --> IMPORTS REACT
import { useCallback, useContext, useState, useEffect, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import { debounce } from 'lodash';
import { VariaveisContext } from "../../context/VariaveisContext";
// END REACT

// ANCHOR --> IMPORTS STYLED COMPONENTS
import styled from "styled-components";
// END STYLED COMPONENTS

// ANCHOR --> IMPORTS PROP TYPES
import { array, bool, string } from "prop-types";
// END PROP TYPES

// ANCHOR --> IMPORTS INPUT EMOJI
import InputEmoji from "react-input-emoji";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// END INPUT EMOJI

// ANCHOR --> IMPORTS REACT ICONS
import { MdSearch, MdAttachFile } from "react-icons/md";
import integraAPI from "../../services";
// END REACT ICONS

const handleFiltraConversasDebounced = debounce((input, handleContatos) => {
    handleContatos(input);
}, 500);

// SECTION --> COMPONENTE DE INPUT DE TEXTOS PARA PESQUISA
export const InputBusca = ({ conversas }) => {

    // SECTION --> VARIAVEL VINDA DO CONTEXT PARA GUARDAR DADOS DE CONVERSAS
    const { setConversasFiltradas, setContatos, instanceParam, loggedUserParam  } = useContext(VariaveisContext);

    const [listaContatos, setListaContatos] = useState([]);

    // SECTION --> PEGA INSTANCIA PASSADA PELA URL
    // const { search } = useLocation();
    // const params = new URLSearchParams(search);

    // STUB --> ESTADO LOCAL PARA ARMAZENAR VALOR DOS PARÂMETROS DE CONSULTA
    // const instanceParam = params.get("instance");
    // const loggedUserParam = params.get("logged_user");

    const handleContatos = useCallback(async (filter) => {
        try {

            if (!filter || filter === '') {
                setConversasFiltradas(conversas);
                setContatos([]);
                return;
            }

            // STUB --> REQUISIÇÃO PARA Conversas
            // await integraAPI.get("contacts", {params: {instance: instanceParam, logged_user: loggedUserParam}})
            const response = await integraAPI.get(`contacts/filter/${filter}`, {params: {instance: instanceParam, logged_user: loggedUserParam}})
            /*.then((res) => {
                // STUB --> AQUI ATRIBUO A RESPOSTA DA REQUISIÇÃO À VARIÁVEL
                setListaContatos(res.data);
            });*/
            const data = response.data;

            if (data && data.length > 0) {
                // Filtrar conversas aqui com os dados mais recentes
                const filtradasConversas = conversas.filter((conversation) =>
                    conversation.contactItem?.nome.toLowerCase().includes(filter.toLowerCase()) ||
                    conversation.contactItem?.nome_whats.toLowerCase().includes(filter.toLowerCase()) ||
                    conversation.contactItem?.telefone.toLowerCase().includes(filter.toLowerCase()) ||
                    conversation.contactItem?.status.toLowerCase().includes(filter.toLowerCase()) ||
                    conversation.departmentItem && conversation.departmentItem.departamento.toLowerCase().includes(filter.toLowerCase()) ||
                    conversation.atendente && conversation.atendente.toLowerCase().includes(filter.toLowerCase()),
                );

                setConversasFiltradas(filtradasConversas);
                setContatos(data);
            } else {
                setConversasFiltradas(conversas);
                setContatos([]);
            }
            
        }
        catch(e) {
            console.log(e);
        }

    }, [setContatos, setConversasFiltradas, conversas, instanceParam, loggedUserParam]);

    const handleFiltraConversas = (e) => {
        const input = e.target.value;
        handleFiltraConversasDebounced(input, handleContatos);
    }
    /*useEffect(() => {
        handleContatos();

    }, [handleContatos]);*/

    return(
        <>
            <InputContainer>
                <IconContainer><MdSearch /></IconContainer>
                <CampoPesquisa placeholder="Pesquisar ou começar uma nova conversa" onChange={handleFiltraConversas}/>
            </InputContainer>
        </>
    );
};
InputBusca.propTypes = {
    conversas: array,
}

const InputContainer = styled.div`
    width: 100%;
    height: 34px;

    position: relative;

    display: flex;
    align-content: center;
`;

const IconContainer = styled.div`
    width: 34px;
    height: 34px;

    position: absolute;
    
    box-sizing:border-box;
    
    top:50%;
    left:2px;
    
    transform: translateY(-50%);

    display: flex;
    justify-content: center;
    align-items: center;

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    background: ${props => props.theme.cores.bgColor.bgSelecionado};

    z-index: -1px;

    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.25);
    
    svg {
        width: 26px;
        height: 26px;
    };
`;

const CampoPesquisa = styled.input`
    width: 100%;
    
    margin-left: 34px;
    padding: 8px;

    box-sizing:border-box;
    
    border-radius: 4px;

    background: ${props => props.theme.cores.bgColor.bgSelecionado};

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;


// SECTION --> COMPONENTE PARA INPUT DE TEXTO
export const InputTexto = ({ texto }) => {
    
    return(
        <TextoInput>{texto}</TextoInput>
    );
};
InputTexto.propTypes = {
    texto: string,
};

const TextoInput = styled.input`
    width: 100%;
    
    padding: 8px;

    border-radius: 4px;

    background: ${props => props.theme.cores.bgColor.bgSelecionado};

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;


// SECTION --> COMPONENTE PARA ENVIAR EMOJIS
export const InputMensagem = () => {
    const { nomeAtendente, numeroDeTelefone, instanceParam, atendenteLogado } = useContext(VariaveisContext);

    const [mensagem, setMensagem] = useState('');
    const [envioEmAndamento, setEnvioEmAndamento] = useState(false);
  
    const handleConversas = async () => {
      try {
        // Verifica se a mensagem não está em branco antes de enviar
        if (mensagem.trim() === '') {
          
          return;
        }
  
        // Inicia o envio, impedindo mais envios enquanto estiver em andamento
        setEnvioEmAndamento(true);
  
        // STUB --> REQUISIÇÃO POST PARA ENVIO DE MENSAGENS
        await integraAPI.post(
          "messages/send-text",
          { phone: numeroDeTelefone, isGroup: false, message: `*[${atendenteLogado.name}]*\n\n` + mensagem },
          { params: { instance: instanceParam } }
        ).then((res) => {
          if (res.status === 200) {
            setMensagem('');
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        // Marca o envio como concluído, permitindo mais envios
        setEnvioEmAndamento(false);
      }
    };
  
    const handleEnter = (e) => {
      if (e.key === "Enter" && !envioEmAndamento) {
        handleConversas();
      }
    };
  
    return (
      <InputEmoji
        value={mensagem}
        onChange={setMensagem}
        borderRadius={8}
        onKeyDown={handleEnter}
        placeholder="Digite uma mensagem"
      />
    );
  };


// SECTION --> COMPONENTE PARA ENVIAR ARQUIVOS E DROPZONE
/*export const FileInput = ({ dropZone = false }) => {

    return(
        !dropZone && <InputFile  />
    );
};*/
export const MyDropzone = () => {
    const { numeroDeTelefone, instanceParam  } = useContext(VariaveisContext);

    const onDrop = useCallback(async (acceptedFiles) => {
        // Considera apenas o primeiro arquivo, conforme sua regra
        const file = acceptedFiles[0];
        const fileName = file.name;
        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
        const fileInBase64 = await fileToBase64(file);

        const userConfirmations = window.confirm(`Deseja enviar o arquivo ${fileName}?`);
        if (!userConfirmations) return;

        const response = await integraAPI.post(
            `/messages/send-file?instance=${instanceParam}`,
            {
                phone: numeroDeTelefone,
                body: fileInBase64,
                fileName,
                caption: fileNameWithoutExtension,
                isGroup: numeroDeTelefone.includes('@g.us'),
            }
        );

        if (response.data.message !== 'Message sent') {
            alert('Erro ao enviar arquivo!');
        } else {
            alert('Arquivo enviado com sucesso!');
        }

    }, [numeroDeTelefone, instanceParam]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste e solte um arquivo aqui, ou clique para selecionar um arquivo</p>
        </div>
    );
};

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export const FileInput = ({ dropZone = false }) => {
    
    // SECTION --> PEGA NUMERO DE TELEFONE DA CONVERSA
    const { numeroDeTelefone, instanceParam  } = useContext(VariaveisContext);

    const fileInputRef = useRef(null);

    const handleSendMessageFile = async () => {
        try {
            const input = fileInputRef.current;
            if (!input.files?.length) return;

            const file = input.files[0];
            const fileName = file.name;
            const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
            const fileInBase64 = await fileToBase64(file);

            const userConfirmations = window.confirm(`Deseja enviar o arquivo ${fileName}?`);
            if (!userConfirmations) return;

            const response = await integraAPI.post(
                `/messages/send-file?instance=${instanceParam}`,
                {
                    phone: numeroDeTelefone,
                    body: fileInBase64,
                    fileName,
                    caption: fileNameWithoutExtension,
                    isGroup: numeroDeTelefone.includes('@g.us'),
                }
            );

            if (response.data.message !== 'Message sent') {
                alert('Erro ao enviar arquivo!');
            } else {
                alert('Arquivo enviado com sucesso!');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar arquivo!');
        }
    };

    const handleFileSelect = () => {
        handleSendMessageFile();
    };

    return (
        <div>
            <InputFile type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
            <ButtonInputFile onClick={() => fileInputRef.current.click()}><MdAttachFile /></ButtonInputFile>
        </div>
    );
};
FileInput.propTypes = {
    dropZone: bool
};

const InputFile = styled.input`
    width: 100px;

    border-radius: 6px;
    border: none;
`;
const ButtonInputFile = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; // Cor de fundo
    border: 1px solid #ccc; // Borda
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    margin: 5px; // Espaçamento

    &:hover {
        background-color: #e0e0e0; // Cor de fundo no hover
    }

    svg {
        width: 20px; // Tamanho do ícone
        height: 20px;
        color: #333; // Cor do ícone
    }
`;

export const InputMensagemComDropzone = () => {
    const { numeroDeTelefone, instanceParam } = useContext(VariaveisContext);
    const [mensagem, setMensagem] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        
        const file = acceptedFiles[0];
        const fileName = file.name;
        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
        const fileInBase64 = await fileToBase64(file);

        const userConfirmations = window.confirm(`Deseja enviar o arquivo ${fileName}?`);
        if (!userConfirmations) return;

        const response = await integraAPI.post(
            `/messages/send-file?instance=${instanceParam}`,
            {
                phone: numeroDeTelefone,
                body: fileInBase64,
                fileName,
                caption: fileNameWithoutExtension,
                isGroup: numeroDeTelefone.includes('@g.us'),
            }
        );

        if (response.data.message !== 'Message sent') {
            alert('Erro ao enviar arquivo!');
        } else {
            alert('Arquivo enviado com sucesso!');
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [numeroDeTelefone, instanceParam]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

    const handleConversas = async () => {
        try {
            // STUB --> REQUISIÇÃO POST PARA ENVIO DE MENSAGENS
            await integraAPI.post("messages/send-text", {phone: numeroDeTelefone, isGroup: false, message: `*[${nomeAtendente}]* \n ` + mensagem}, {params: {instance: instanceParam}})
            .then((res) => {
                if(res.status === 200) {
                    setMensagem('');
                }
            });

        } catch(e) {
            console.log(e);
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (mensagem.trim() !== '') {
                handleConversas();
            }
        }
    };

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <InputEmojiContainer>
                <InputEmoji
                    value={mensagem}
                    onChange={setMensagem}
                    borderRadius={8}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite uma mensagem aqui"
                />
            </InputEmojiContainer>
            {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px' }} />}
        </DropzoneContainer>
    );
};

const InputEmojiContainer = styled.div`
    width: 100%;
`;

const DropzoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 1px dashed #ccc;
`;

/*.react-input-emoji--input {
    font-weight: 400;
    max-height: 100px;
    min-height: 20px;
    outline: none;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 1;
    width: 100%;
    user-select: text;
    padding: 9px 12px 11px;
    text-align: left;
}*/

// SECTION --> COMPONENTE PARA ENVIAR ÁUDIO
export const AudioInput = () => {

    // SECTION --> PEGA NUMERO DE TELEFONE DA CONVERSA
    const { numeroDeTelefone, instanceParam  } = useContext(VariaveisContext);

    // SECTION --> VARIAVEL PARA GUARDAR B64 DO AUDIO
    const [audio, setAudio] = useState();

    const recorderControls = useAudioRecorder();
    
    function fileToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    
    const handleEnviarAudio = async (audioGravado) => {
        try {

            await fileToBase64(audioGravado).then(res => setAudio(res));

            // STUB --> REQUISIÇÃO POST PARA ENVIO DE MENSAGENS
            // console.log(audio);
            await integraAPI.post('messages/send-audio', {phone: numeroDeTelefone, isGroup: false, body: audio}, {params: {instance: instanceParam}})
            
        } catch(e) {
            console.log(e);
        }
    };
    
    return(
        <>
            <ContainerAudio>
                <AudioRecorder onRecordingComplete={(audioGravado) => handleEnviarAudio(audioGravado)} recorderControls={recorderControls} />
            </ContainerAudio>
            {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
        </>
    );
};

const ContainerAudio = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;
  
    
    img {
        width: 14px;
        height: 14px;
        /*  */
        /* border: 1px solid red; */
    }
`;