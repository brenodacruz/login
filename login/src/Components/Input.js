import styles from "../Styles/Input.module.css"

export default function Input(props){
    return(
        <input name={props.name} type={props.type} placeholder={props.placeholder} className={styles.input} onChange={props.onChange} value={props.value}></input>
    )
}