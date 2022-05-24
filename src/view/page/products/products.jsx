import { Fragment, useState } from "react";
import Product from "./product/product";
import Select from "../../../components/select/select";
import {Period, Range} from "../../../services/helper";
import {useWindowSize} from '../../../services/hooks'
import MobileProduct from "../../mobile/products/product/product";
import style from './products.module.scss'

const Products = ({ products, currencyChange, updatePeriodHandler, updateRangeHandler, priceFrom, priceTo }) => {
    const [isMinView, setIsMinView] = useState(false);
    const [isMaxView, setIsMaxView] = useState(false);
    const [width] = useWindowSize();

    if(width > 992 && !isMaxView) {
        setIsMaxView(true);
        setIsMinView(false);
    }

    if(width < 992 && !isMinView) {
        setIsMaxView(false);
        setIsMinView(true);
    }

    return (
        <>
            <div className={style.header}>
                <h4>{ products.meta.total} განცხადება</h4>
                <div className={style.selects}>
                    <div className={style.selectBox}>
                        <Select
                            optionKey="title"
                            options={Period}
                            autoWidth={true}
                            label=' '
                            defaultValue='პერიოდი'
                            onChangeHandler={(item) => updatePeriodHandler(item)}
                        />
                    </div>
                    <div className={style.selectBox}>
                        <Select
                            optionKey="title"
                            options={Range}
                            autoWidth={true}
                            label=' '
                            defaultValue='თარიღი კლებადი'
                            onChangeHandler={(item) => updateRangeHandler(item)}
                        />
                    </div>
                </div>
            </div>
            <div className={style.products}>
                {products.items
                    .filter(item => parseFloat(item['price_value']) >= parseFloat(priceFrom) && parseFloat(item['price_value']) <= parseFloat(priceTo))
                    .map((item, index) => (
                        <Fragment key={index}>
                            {isMinView && <MobileProduct item={item} currencyChange={currencyChange} />}
                            {isMaxView && <Product item={item} currencyChange={currencyChange}  />}
                        </Fragment>

                ))}
            </div>
        </>
    )
}

export default Products;
