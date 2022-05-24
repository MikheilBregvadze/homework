import {SVG} from "../../../../components/svg/svg";
import {FormatPrice, TimeSince} from "../../../../services/common";
import style from './product.module.scss'

const Product = ({ item, currencyChange }) => {
    const onImageLoadError = (e) => { // Fill default image
        e.target.src = 'https://static.my.ge/myauto/photos/4/3/4/5/6/thumbs/72654341_1.jpg?v=7';
    }
    return (
        <div className={style.product}>
            <div className={style.image}>
                <img onError={onImageLoadError} src={`https://static.my.ge/myauto/photos/${item.photo}/thumbs/72${item.photo.split('/').reverse().join().replaceAll(',', '')}3_1.jpg?v=29`} alt={item.photo} />
            </div>

            <div className={style.description}>
                <div className={style.row1}>
                    <h2 className={style.itemName}>LAND ROVER Range Rover Evoque <span>{item['prod_year']} წ</span></h2>
                    <div className={style.customPass}>
                        {!item['for_rent'] && <div>
                            {item['customs_passed']
                                ? <p className={style.isPassed}>
                                    <span>
                                        <SVG id="successIcon" />
                                    </span>
                                    განბაჟებული
                                    </p>
                                : <p className={style.isNotPassed}>განბაჟება</p>
                            }
                        </div>}

                        <div className={style.location}>
                            <span>
                                <SVG id="flag" />
                            </span>
                                <span>რუსთავის ავტო.</span>
                            </div>
                    </div>
                </div>
                <div className={style.row2}>
                    <div className={style.details}>
                        <div>
                            <span>
                                <SVG id="engine" />
                            </span>
                            <p>{(item['engine_volume'] / 1000).toFixed(1)} დატ. ჰიბრიდი</p>
                        </div>
                        <div>
                            <span>
                                <SVG id="miles" />
                            </span>
                            <p>{item['car_run_km']} კმ</p>
                        </div>
                        <div>
                            <span>
                                <SVG id="transmission" />
                            </span>
                            <p>ავტომატიკა</p>
                        </div>
                        <div>
                            <span>
                                <SVG id="wheel" />
                            </span>
                            <p>მარჯვნივ</p>
                        </div>
                    </div>
                    <div className={style.price}>
                        <h3>{currencyChange ? FormatPrice(item['price']) : FormatPrice(item['price_value']) }</h3>
                        <div className={style.currency}>
                            <SVG id={!currencyChange ? "gelDark" : "dollarBlack"} />
                        </div>
                    </div>
                </div>

                <div className={style.row3}>
                    <div className={style.views}>
                        <div>{item['views']} ნახვა</div>
                        <div>{TimeSince(new Date(item['order_date']))}</div>
                    </div>
                    <div className={style.icons}>
                        <span>
                            <SVG id="icon1" />
                        </span>
                        <span>
                            <SVG id="icon2" />
                        </span>
                        <span>
                            <SVG id="icon3" />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product;
