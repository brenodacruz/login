import React, { useState } from 'react'
import styles from '../Styles/Register.module.css'
import Input from './Input'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [formValues, setFormValues] = useState({
        usuario: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        const { usuario, email, senha, confirmarSenha } = formValues

        if (!usuario || !email || !senha || !confirmarSenha) {
            setMessage('Todos os campos devem ser preenchidos.')
            setMessageType('error')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('O email deve ser válido.')
            setMessageType('error')
            return;
        }

        if (senha !== confirmarSenha) {
            setMessage('As senhas não coincidem.')
            setMessageType('error')
            return
        }

        const formData = new FormData()
        formData.append('usuario', usuario)
        formData.append('email', email)
        formData.append('senha', senha)
        formData.append('confirmarSenha', confirmarSenha)

        try {
            const response = await fetch('http://localhost/login/api.php', {
                method: 'POST',
                body: formData,
            });
           
            const result = await response.json();
            
            if (result.error) {
                setMessage(result.message)
                setMessageType('error')
            } else {
                setMessage(result.message)
                setMessageType('success')
                setFormValues({
                    usuario: '',
                    email: '',
                    senha: '',
                    confirmarSenha: ''
                });
                setTimeout(() => navigate('/entrar'), 2000)
            }
        } catch (error) {
            setMessage('Ocorreu um erro ao enviar o formulário.')
            setMessageType('error')
        }
    };

    return (
        <div className={styles.container}>
            <h1>Cadastrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="usuario"
                    type="text"
                    placeholder="Usuário"
                    onChange={handleChange}
                    value={formValues.usuario}
                />
                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formValues.email}
                />
                <Input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    onChange={handleChange}
                    value={formValues.senha}
                />
                <Input
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirmar senha"
                    onChange={handleChange}
                    value={formValues.confirmarSenha}
                />
                <button type="submit">Cadastrar</button>
                {message && (
                    <div
                        className={`${styles.message} ${
                            messageType === 'success' ? styles.success : styles.error
                        }`}
                    >
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
