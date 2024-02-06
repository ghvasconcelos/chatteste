export const notification = (newMessage) => {
    new Notification('Nova mensagem recebida!', {
      body: 'De: ' + newMessage.nome_whats,
      icon: 'https://www.integrachat.com.br/chat/favicon.ico',
      requireInteraction: false,
      vibrate: [200, 100, 200],
    });
  }