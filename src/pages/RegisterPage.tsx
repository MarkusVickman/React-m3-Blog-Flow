import React, { useEffect, useState } from "react"
import './css/RegisterPage.css'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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
            await register({ name, email, password });
            navigate("/login");
        } catch (error) {
            setError("Felaktig registrering:" + error)

        }
    }

    return (

        <>

            <div className="container">
                <h1 className="title ">Registrera nytt konto</h1>

                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label" htmlFor="name">Visningsnamn</label>
                        <p className="control has-icons-left">
                            <input className="input" type="text" id="name" placeholder="Visningsnamn" required value={name} onChange={(e) => setName(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Visningsnamn">edit</i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="email">Email-adress</label>
                        <p className="control has-icons-left">

                            <input className="input" type="email" id="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Email">email</i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Lösenord</label>
                        <p className="control has-icons-left">

                            <input className="input" type="password" placeholder="Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Lösenord">password</i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-success" type="submit">
                                Registrera
                            </button>
                        </p>
                        {error && (
                            <div>
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterPage