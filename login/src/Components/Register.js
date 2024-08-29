import styles from '../Styles/Register.module.css'
import Input from './Input'


export default function Register(){
    return(
        <div className={styles.container}>
            <h1>Cadastrar</h1>
            <Input name="usuario" type="text" placeholder="Usuário"></Input>
            <Input name="usuario" type="text" placeholder="Email"></Input>
            <Input name="usuario" type="password" placeholder="Senha"></Input>
            <Input name="usuario" type="password" placeholder="Confirmar senha"></Input>
            <button>Cadastrar</button>
        </div>
    )
}