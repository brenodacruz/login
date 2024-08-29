import React, { useState } from 'react';
import styles from '../Styles/Register.module.css';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formValues, setFormValues] = useState({
        usuario: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Função para atualizar os valores do formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { usuario, email, senha, confirmarSenha } = formValues;

        // Verifica se todos os campos estão preenchidos
        if (!usuario || !email || !senha || !confirmarSenha) {
            setMessage('Todos os campos devem ser preenchidos.');
            setMessageType('error');
            return;
        }

        // Verifica o formato do email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('O email deve ser válido.');
            setMessageType('error');
            return;
        }

        // Verifica se as senhas são iguais
        if (senha !== confirmarSenha) {
            setMessage('As senhas não coincidem.');
            setMessageType('error');
            return;
        }

        // Cria um objeto com os dados do formulário
        const formData = new FormData();
        formData.append('usuario', usuario);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('confirmarSenha', confirmarSenha);

        try {
            // Faz a requisição para o PHP
            const response = await fetch('http://localhost/login/api.php', {
                method: 'POST',
                body: formData,
            });

            // Converte a resposta para JSON
            const result = await response.json();

            // Se a resposta do PHP indicar um erro, exibe a mensagem
            if (result.error) {
                setMessage(result.message); // Atualiza o estado com a mensagem de erro
                setMessageType('error'); // Define o tipo de mensagem como erro
            } else {
                setMessage(result.message); // Atualiza o estado com a mensagem de sucesso
                setMessageType('success'); // Define o tipo de mensagem como sucesso
                // Limpa os campos do formulário
                setFormValues({
                    usuario: '',
                    email: '',
                    senha: '',
                    confirmarSenha: ''
                });
                // Navega para a página de login
                setTimeout(() => navigate('/entrar'), 2000); // Redireciona após 2 segundos para permitir a visualização da mensagem
            }
        } catch (error) {
            setMessage('Ocorreu um erro ao enviar o formulário.');
            setMessageType('error');
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
