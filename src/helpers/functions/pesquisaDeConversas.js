export const pesquisaConversas = ({
    event,
    conversations,
    setContacts,
    setFilteredConversations,
  }) => {
    try {
      const input = event.target;
      const inputValue = input.value;
  
      if (!inputValue) {
        setContacts([]);
        setFilteredConversations([]);
        return;
      }
  
      const filteredConversations = conversations.filter((conversation) => {
        const contactName =
          conversation.contactItem?.nome ||
          conversation.contactItem?.nome_whats ||
          '';
        const contactPhone = conversation.contactItem?.telefone || '';
        const department =
          (conversation.departmentItem && conversation.departmentItem.departamento) ||
          '';
        const atendente = conversation.atendente || '';
  
        const matchesSearch =
          contactName.toLowerCase().includes(inputValue.toLowerCase()) ||
          contactPhone.toLowerCase().includes(inputValue.toLowerCase()) ||
          department.toLowerCase().includes(inputValue.toLowerCase()) ||
          atendente.toLowerCase().includes(inputValue.toLowerCase());
  
        return matchesSearch;
      });
  
      setFilteredConversations(filteredConversations);
    } catch (error) {
      console.error(error.message, error);
    }
  };
  