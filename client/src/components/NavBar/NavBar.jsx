import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {

    return (
        <div className={style.mainContainer}>
            <Link to='/'>Home</Link>
            <Link to='/form'>Form</Link>
        </div>
    )
}

export default NavBar;