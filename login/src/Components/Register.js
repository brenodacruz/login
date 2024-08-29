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
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        if (senha != confirmarSenha){
            alert('Senhas erradas');
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

            // Se a resposta do PHP indicar um erro, exibe um alerta
            if (result.error) {
                alert(result.error);
            } else {
                alert('Cadastro realizado com sucesso!');
                // Limpa os campos do formulário, se necessário
                setFormValues({
                    usuario: '',
                    email: '',
                    senha: '',
                    confirmarSenha: ''
                });
                navigate('/entrar');
            }
        } catch (error) {
            alert('Ocorreu um erro ao enviar o formulário.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Cadastrar</h1>
            <form onSubmit={handleSubmit}>
                <Input name="usuario" type="text" placeholder="Usuário" onChange={handleChange} value={formValues.usuario} />
                <Input name="email" type="text" placeholder="Email" onChange={handleChange} value={formValues.email} />
                <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} value={formValues.senha} />
                <Input name="confirmarSenha" type="password" placeholder="Confirmar senha" onChange={handleChange} value={formValues.confirmarSenha} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
