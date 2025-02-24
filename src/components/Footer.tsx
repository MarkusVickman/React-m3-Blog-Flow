import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {


    return (
        <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Flow</strong> skapad av <strong>Markus Vickman</strong>. 
             Läs mer om webbplatsen <NavLink to="/about">Om oss</NavLink>
          </p>
        </div>
      </footer>
    )
}

export default Footer