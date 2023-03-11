import style from './Card.module.css';


const Card = (props) => {
    return (
        <div className={style.card}>
        <p>Id: {props.id}</p>
        <p>Nombre: {props.nombre}</p>
        <p>Tipo: {props.tipo}</p>
        </div>
    );
    };

    export default Card;