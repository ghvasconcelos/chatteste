// ANCHOR --> IMPORTS REACT
import React from 'react';
import ReactDOM from 'react-dom/client'
// END REACT

// ANCHOR --> IMPORTS GLOBAL STYLES
import { GlobalStyle } from './assets/style/globalStyle.jsx'
// END GLOBAL STYLES

// ANCHOR --> IMPORTS REACT CONTEXT
import { ContextProvider } from './context/VariaveisContext.jsx';
// END CONTEXT


import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <GlobalStyle />
      <App />
    </ContextProvider>
  </React.StrictMode>,
)
