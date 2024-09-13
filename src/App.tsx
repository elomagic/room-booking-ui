import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainView from "./pages/main/MainView.tsx";
import SettingsView from "./pages/settings/SettingsView.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/settings' element={<SettingsView/>}/>

                <Route path='/' element={<MainView/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
