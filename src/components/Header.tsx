import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user, logout } = useAuth();
    return (
        <header>
            <ul>
                <li><NavLink to="/">Startsida</NavLink></li>

                { user ? <li><NavLink to="/personal">Egen blogg</NavLink></li> : null }

                <li><NavLink to="/single">Single</NavLink></li>
                <li><NavLink to="/about">Om oss</NavLink></li>
                <li>
                    {
                        user ? <button onClick={logout}>Logga ut</button> : <NavLink to="/login">Logga in</NavLink>
                    }
                </li>
            </ul>
        </header>
    )
}

export default Header