import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

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

            localStorage.setItem("trespasser", data.token);
            setUser(data.user);

        } catch (error) {
            throw error;
        }

    }

    const logout = () => {
        localStorage.removeItem("trespasser");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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

