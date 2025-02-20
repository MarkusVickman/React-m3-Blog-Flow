import React, { useEffect, useState } from "react"
import './css/RegisterPage.css'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');

    const { register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/personal")
        }
    }, [user])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await register({ displayName, email, password });
            navigate("/login");
        } catch (error) {
            setError("Felaktig registrering:" + error)

        }
    }

    return (
        <div>
            <div>

                <h2>Registrera nytt konto</h2>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="displayname">Visningsnamn</label>
                        <input type="text" id="displayname" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email-adress</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Lösenord</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit">Registrera</button>

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

export default RegisterPage