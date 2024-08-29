import styles from "../Styles/Footer.module.css"

export default function Footer(){
    return(
        <div className={styles.footer}>
            <p> &copy; Este projeto é um projeto pessoal desenvolvido por <a href="https://www.linkedin.com/in/breno-henrique-32226a275/" target="blank">Breno Henrique</a> a fins de aprendizado e portfólio.</p>
        </div>
    )
}