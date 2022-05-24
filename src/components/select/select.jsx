import {useEffect, useState} from "react";
import {SVG} from "../svg/svg";
import {useClickOutside} from "../../services/hooks";
import style from './select.module.scss'

const Select = ({ options, optionKey, label, placeholder, onChangeHandler, defaultValue, autoWidth }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [optionsList, setOptionsList] = useState(null);

    useEffect(() => {
        if(options) setOptionsList(options);
        if(!options) setSelectedOption(null);
    }, [options])

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
        onChangeHandler(optionsList[index]);
    };

    const resetSelect = (e) => {
        onChangeHandler(null);
        setSelectedOption(null);
        setIsOptionsOpen(false);
        onChangeHandler(null);
        e.stopPropagation();
    }

    let domNode = useClickOutside(() => {
        setIsOptionsOpen(false)
    }, true)

    return(
        <div className={`${style.select} ${autoWidth ? style.autoWidth : ''}`} ref={domNode}>
            { !defaultValue && label && <p className={style.label}>{label}</p> }
            <button
                type="button"
                className={style.expanded}
                onClick={toggleOptions}
            >
                {optionsList && (!label || selectedOption !== null)
                    ? optionsList[selectedOption][optionKey]
                    : <span>{defaultValue ? defaultValue : placeholder}</span>
                }
                {
                    selectedOption === null
                        ?
                        <span className={`${style.arrow} ${isOptionsOpen && optionsList ? style.arrowActive : ''}`}>
                            <SVG id="arrowDown"/>
                        </span>
                        :
                        <span onClick={resetSelect}>
                            <SVG id="close"/>
                        </span>
                }
            </button>
            {optionsList &&
                <div className={`${style.options} ${isOptionsOpen ? style.show : ""}`}>
                    <ul className={style.scrollSection}
                        tabIndex={-1}
                    >
                        {optionsList.map((option, index) => (
                            <li
                                key={index}
                                role="option"
                                aria-selected={selectedOption === index}
                                tabIndex={0}
                                onClick={() => {
                                    setSelectedThenCloseDropdown(index);
                                }}
                            >
                                {option[optionKey]}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )

}

export default Select;
