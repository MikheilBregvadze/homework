import {memo} from "react";
import {SVG} from "../../../components/svg/svg";
import style from './nav.module.scss'

const Nav = ({searchType}) => {
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <a href="/">
                        მთავარი
                    </a>
                    <span className={style.arrow}>
                        <SVG id="arrow" />
                    </span>
                </li>
                <li>
                    <a href="/">ძიება</a>
                    <span className={style.arrow}>
                        <SVG id="arrow" />
                    </span>
                </li>
                <li>
                    <a className={style.active} href="/">{searchType === 1 ? 'ქირავდება' : 'იყიდება'}</a>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Nav);
