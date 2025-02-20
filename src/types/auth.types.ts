
export interface User {
    email: string,
    name: string,
    isAdmin: boolean
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegisterCredentials {
    displayName: string,
    email: string,
    password: string
}

export interface AuthResponse {
    user: User,
    access_token: string
}

export interface AuthContextType {
    user: User | null,
    login: (Credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    register: (Credentials: RegisterCredentials) => Promise<void>;
}

