import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import './Header.css';

const Header = () => {

    const { user, logout } = useAuth();


        function toggleBurgerMenu() {
          document.querySelector('.navbar-menu')!.classList.toggle('is-active');
        }

        return (
            <header>

                <nav className="navbar" aria-label="main navigation">
                    <div className="navbar-brand">
                        <NavLink to="/" className="navbar-item is-size-3 has-text-weight-bold">Flow</NavLink>

                        <a role="button" className="navbar-burger" onClick={toggleBurgerMenu} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">

                            <NavLink to="/" className="navbar-item" onClick={toggleBurgerMenu}>Startsida</NavLink>
                            {user ? <NavLink className="navbar-item" to="/personal" onClick={toggleBurgerMenu}>Egen blogg</NavLink> : null}
                            <NavLink to="/about" className="navbar-item" onClick={toggleBurgerMenu}>Om oss</NavLink>

                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {!user ? <NavLink to="/register" className="button is-primary">Registrera</NavLink> : null}

                                {
                                    user ? <button className="button is-light" onClick={logout}>Logga ut</button> : <NavLink to="/login" className="button is-light">Logga in</NavLink>
                                }

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

    export default Header
