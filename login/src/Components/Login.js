import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import styles from "../Styles/Login.module.css"
import Input from './Input'

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }
    return(
        <div className={styles.container}>
            <div className={styles.login}>
                <h1>Entrar</h1>
                <Input name="usuario" type="text" placeholder="Usuário ou email"></Input>

                <div className={styles.password}>
                    <Input
                        name="senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                    />

                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className={styles.icon}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className={styles.container2}>
                    <a href='#'>Esqueci minha senha</a>
                    <button>Entrar</button> 
                </div>                   
                
            </div>
        </div>
    )
}
