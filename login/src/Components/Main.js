import styles from '../Styles/Main.module.css'
import portfolioImage from './img/portfolio.png'

export default function Main(){
    return(
        <div className={styles.main}>
            <section>
                <h1>O que é este projeto?</h1>
                <p>Este projeto é um sistema de login desenvolvido utilizando HTML, CSS, JavaScript, React.js, PHP e MySQL. Tem como objetivo principal o aprendizado e a criação de um portfólio robusto, demonstrando habilidades em desenvolvimento web full-stack.
                </p>
                <h1>Como usar?</h1>
                <p>Neste projeto, você pode realizar duas ações principais: <br/><b>1-</b> Cadastrar-se: Insira um nome de usuário, e-mail e senha para criar uma nova conta. <br/><b>2-</b> Entrar: Faça login com as credenciais cadastradas. O sistema verificará a validade do login e/ou do cadastro.</p>
                <h2>Para ver mais projetos clique no portfólio abaixo:</h2>
                <a href="https://brenodacruz.github.io/Portfolio/" target='blank'><img src={portfolioImage} ></img></a>
            </section>
        </div>
    )
}