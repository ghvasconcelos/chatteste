export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const dateString = `${day}/${month} ${hour}:${minutes}`;

  return dateString;
}

export function dateUltimaMensagem(date) {
  if (!date || date === 'undefined') {
      date = getDate();
  }
  
  const today = new Date().toLocaleDateString("pt-BR", {day: "numeric", month: "long"});
  const dateObj = new Date(date);
  
  const currentDate = dateObj.toLocaleDateString('pt-br', {
      day: 'numeric',
      month: 'short',
  });

  const currentHour = dateObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
  });
    
  if (currentDate === today) {
      return `${currentDate} ${currentHour}`;
  }
  
  if (currentDate !== today) {
      return `${currentDate} ${currentHour}`;
  }

  return '';  
}
