import { Link } from "react-router-dom"
import styles from "../Styles/Header.module.css"

export default function Header(){
    return(
        <nav className={styles.header}>
            <h1>Projeto de Login</h1>
           <ul>
                <li><Link to="/">Principal</Link></li>
                <li><Link to="/entrar">Entrar</Link></li>
                <li><Link to="/cadastrar">Cadastrar</Link></li>
           </ul>
        </nav>
    )
}