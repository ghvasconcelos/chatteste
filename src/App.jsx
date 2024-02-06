// ANCHOR --> IMPORTS SYLED COMPONENTS
import { ThemeProvider } from "styled-components"
import { theme } from "./themes/index";
// END COMPONENTS

//NOTE --> IMPORTS REACT E REACT ROUTER
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
// END REACT E REACT ROUTER

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
