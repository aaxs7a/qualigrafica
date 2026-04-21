import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Insumos from './pages/Insumos.jsx';
import Movimentacoes from './pages/Movimentacoes.jsx';

function RotaProtegida({ children }) {

  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/" />;

}

function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <Routes>

                    <Route path="/" element={ <Login /> } />

                    <Route path="dashboard" element={

                        <RotaProtegida><Dashboard /></RotaProtegida>

                    } />

                    <Route path="insumos" element={

                        <RotaProtegida><Insumos /></RotaProtegida>

                    } />

                    <Route path="movimentacoes" element={

                        <RotaProtegida><Movimentacoes /></RotaProtegida>

                    } />

                </Routes>

            </BrowserRouter>

        </AuthProvider>

    );

}

export default App;