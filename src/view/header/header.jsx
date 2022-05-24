import {SVG} from "../../components/svg/svg";
import style from './header.module.scss';
const Header = () => {
    return (
        <header className={style.header}>
            <div className="container">
                <a href='/'>
                    <SVG id='logo' />
                </a>
            </div>
        </header>
    )
}

export default Header;
