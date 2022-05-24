import {useEffect, useState} from "react";
import Nav from "./navigation/nav";
import Filter from "./aside/filter";
import Products from "./products/products";
import {GetProducts} from "../../services/service";
import style from './index.module.scss';

const Page = () => {
    const [products, setProducts] = useState(null);
    const [updateProducts, setUpdatePProducts] = useState(null);
    const [filteredParameters, setFilteredParameters] = useState({period: '', range: ''});
    const [currencyChange, setCurrencyChange] = useState(false);
    const [loadingResponse, setLoadingResponse] = useState(false);
    const [priceRange, setPriceRange] = useState(null);
    const [pageTitleType, setPageTitleType] = useState(null);
    
    useEffect(() => {
        getProducts({dealType: '', params: ''}, true);
    }, [])

    const getProducts = (params, update) => {
        GetProducts(params.dealType, params.params, params.category, params.period, params.range)
            .then(res => {
                if(res.data && res.data.data) {
                    setProducts(res.data.data);
                    if(update) {
                        setLoadingResponse(false);
                        setUpdatePProducts(res.data.data);
                    }
                }
            })
            .catch(error => console.log(error))
    }

    const onChangeProductsUpdate = (dealType, params, category) => {
        getProducts({dealType: dealType, params: params, category: category});
        setFilteredParameters({...filteredParameters, dealType: dealType, params: params, category: category});
    }

    const searchProduct = (dealType, params, category, priceRange) => {
        setLoadingResponse(true);
        setPriceRange(priceRange);
        setPageTitleType(dealType);
        getProducts({dealType: dealType, params: params, category: category}, true);
        setFilteredParameters({...filteredParameters, dealType: dealType, params: params});
    }

    const filterByRange = (item) => {
        setLoadingResponse(true);
        setFilteredParameters({...filteredParameters, range: item ? item.value : ''});
        getProducts({
            dealType: filteredParameters.dealType,
            params: filteredParameters.params,
            category: filteredParameters.category,
            range: item ? item.value : '',
            period: filteredParameters.period
        }, true);
    }

    const filterByPeriod = (item) => {
        setLoadingResponse(true);
        setFilteredParameters({...filteredParameters, period: item ? item.value : ''});
        getProducts({
            dealType: filteredParameters.dealType,
            params: filteredParameters.params,
            category: filteredParameters.category,
            range: filteredParameters.range,
            period: item ? item.value : ''
        }, true);
    }

    return (
        <section className="container">
            <Nav searchType={pageTitleType} />
            <div className={style.row}>
                <Filter
                    products={products}
                    searchProduct={searchProduct}
                    onChangeProductsUpdate={onChangeProductsUpdate}
                    updateCurrency={() => setCurrencyChange(!currencyChange)}
                />
                <main className={loadingResponse ? style.loadingResponse : ''}>
                    { updateProducts &&
                        <Products
                            products={updateProducts}
                            currencyChange={currencyChange}
                            updateRangeHandler={(item) => filterByRange(item)}
                            updatePeriodHandler={(item) => filterByPeriod(item)}
                            priceTo={priceRange && priceRange.to.length !== 0 ? priceRange.to : 10000000}
                            priceFrom={priceRange && priceRange.from.length !== 0 ? priceRange.from : 0}
                        />
                    }
                </main>
            </div>
        </section>
    )
}

export default Page;

