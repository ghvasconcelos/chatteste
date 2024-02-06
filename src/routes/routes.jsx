// ANCHOR --> IMPORTS REACT ROUTER DOM
// import { createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
// END REACT ROUTER DOM

// ANCHOR --> IMPORTS COMPONENTES
import { NotFound } from "../pages/err";
import { Chat } from "../pages/Chat";
// END COMPONENTES

export const router = createBrowserRouter([
    {
        path: "/chatnew?",
        
        element: <Chat />,
        errorElement: <NotFound to="/" />,
    },
]);
