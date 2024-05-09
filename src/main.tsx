import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import {ApiAuthProvider} from "./context/apiAuthContext.tsx";
import {ThemeModeProvider} from "./context/themeModeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApiAuthProvider>
            <ThemeModeProvider>
                <App/>
            </ThemeModeProvider>
        </ApiAuthProvider>
    </React.StrictMode>,
)
