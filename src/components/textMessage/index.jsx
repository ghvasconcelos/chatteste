import React from 'react'

export default function TextMessage({json}) {
  
    return (
    <div>{json.message.extendedTextMessage.text}</div>
  )
}
