import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <nav className="navbar" style={{ backgroundColor : 'rgb(51 70 157)' }}>
            <img className="mob-standard-logo" src="https://www.softexpert.com/wp-content/webp-express/webp-images/uploads/2021/02/softexpert-2021-Branca11.png.webp" alt="SoftExpert"></img>
            
            <ul className="nav justify-content-end">
                <li className="nav-item active">
                    <Link to="/" className="nav-link white">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/vendas" className="nav-link white" href="#">Vendas</Link>
                </li>
                <li className="nav-item">
                    <Link to="/produtos"  className="nav-link white" href="#">Produtos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/tipo-produtos" className="nav-link white" href="#">Tipo de Produtos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/impostos" className="nav-link white" href="#">Impostos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header