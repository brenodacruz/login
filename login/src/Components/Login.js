import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Login.module.css';
import Input from './Input';

export default function Login() {
    const [formValues, setFormValues] = useState({
        usuario: '',
        senha: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error
    const navigate = useNavigate();

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { usuario, senha } = formValues;

        if (!usuario || !senha) {
            setMessage('Por favor, preencha todos os campos.');
            setMessageType('error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('usuario', usuario);
            formData.append('senha', senha);

            const response = await fetch('http://localhost/login/login.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.error) {
                setMessage(result.message);
                setMessageType('error'); // Define o tipo de mensagem como erro
            } else {
                setMessage(result.message);
                setMessageType('success'); // Define o tipo de mensagem como sucesso
                setTimeout(() => {
                    navigate('/logado'); // Redireciona após 2 segundos para permitir a visualização da mensagem
                }, 2000);
            }
        } catch (error) {
            setMessage('Erro ao tentar fazer login.');
            setMessageType('error');
        }
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <h1>Entrar</h1>
                <Input
                    name="usuario"
                    type="text"
                    placeholder="Usuário ou email"
                    value={formValues.usuario}
                    onChange={handleChange}
                />

                <div className={styles.password}>
                    <Input
                        name="senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={formValues.senha}
                        onChange={handleChange}
                    />

                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className={styles.icon}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className={styles.container2}>
                    <a href='#'>Esqueci minha senha</a>
                    <button onClick={handleSubmit}>Entrar</button>
                </div>
                {message && (
                    <div
                        className={`${styles.message} ${
                            messageType === 'success' ? styles.success : styles.error
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
