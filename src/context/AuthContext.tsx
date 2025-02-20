import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType, RegisterCredentials } from "../types/auth.types";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {

        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error("Inloggning misslyckades");
            }

            const data = await res.json() as AuthResponse;

            const decoded: User = jwtDecode(data.access_token);

            localStorage.setItem("trespasser", data.access_token);
            setUser({
                email: decoded.email,
                name: decoded.name,
                isAdmin: decoded.isAdmin,
            });

        } catch (error) {
            throw error;
        }

    }


    const register = async (credentials: RegisterCredentials) => {

        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error("Registrering misslyckades");
            }

        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("trespasser");
        setUser(null);
    }

    const checkToken = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return;
        }
        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + token
                }
            });

            if (res.ok) {
                const data = await res.json() as AuthResponse;
                const decoded: User = jwtDecode(data.access_token);
                setUser({
                    email: decoded.email,
                    name: decoded.name,
                    isAdmin: decoded.isAdmin,
                });
            }

        } catch {
            localStorage.removeItem("access_token");
        }
    }

    useEffect(() => {
        checkToken();
    }, [])



    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>

    )

}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider")
    }

    return context;
}

