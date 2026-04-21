import { createContext, useContext, useState }  from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() => {

        const nome = localStorage.getItem('nomeUsuario');
        return nome ? { nome } : null;

    });

    function login( token, nome ) {

        localStorage.setItem('token', token);
        localStorage.setItem('nomeUsuario', nome);
        setUsuario({ nome });

    }

    function logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('nomeUsuario');
        setUsuario(null);

    }

    return (

        <AuthContext.Provider value= {{ usuario, login, logout }}>
            { children }
        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}