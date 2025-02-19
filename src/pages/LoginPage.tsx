import React, { useState } from "react"
import './css/LoginPage.css'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
        await login({email, password});
        navigate("/personal");
        } catch(error) {
            setError("Felaktig inloggning. Säkerställ att lösenord och email är korrekt.")

        }
    }

    return (
        <div>
            <div>

                <h2>Logga in på ditt konto</h2>

                <form onSubmit={handleSubmit}>
                  
                    <div>
                        <label htmlFor="email">Emailadress</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Lösenord</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit">Logga in</button>

                    {error && (
                        <div>
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default LoginPage