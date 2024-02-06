import React from 'react'

export default function ContactMessage({mens_whats}) {
  
    const nomeContato = json.message.contactMessage.displayName
    const vcard = json.message.contactMessage.vcard
    const infovCard = vcard.split(";")
    
    
    const telefone = infovCard[7]
    const telefoneData = telefone.split(":")
    const numero = telefoneData[0]
    //console.log(numero.split('='))
    const numeroMostrar = numero.split('=')[1]
   // console.log(numeroMostrar)
  return (
    <div>{nomeContato} {numeroMostrar}</div>
  )
}


