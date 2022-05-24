import {useEffect, useState, memo} from "react";
import {SVG} from "../../../components/svg/svg";
import Select from "../../../components/select/select";
import {GetManufacturer, GetCategories, GetModels} from "../../../services/service";
import style from './filter.module.scss';

//TODO: კატეგორიის ფილტრის ასამუშავებლად. დიზაინში ნაკლები ფილტრის სელექტი რადგან იყო 
const showCategorySelect = false;
//>

const Filter = ({ onChangeProductsUpdate, searchProduct, products, updateCurrency }) => {
    const [ dealType, setDealType ] = useState(null);

    const [manufacturerOptions, setManufacturerOptions] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);

    const [modelOptions, setModelOptions] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    
    const [categorieOptions, setCategorieOptions] = useState(null);
    const [selectedCategorie, setSelectedCategorie] = useState(null);

    const [isDollarSelected, setIsDollarSelected] = useState(false);
    const [priceRange, setPriceRange] = useState({from: '', to: ''})

    useEffect(() => {
        if(!products) return;
        const { dealType, params, category } = returnQueryParameters();
        onChangeProductsUpdate(dealType, params, category);
    }, [dealType, selectedManufacturer, selectedModel, selectedCategorie]);

    const returnQueryParameters = () => {
        const manufacturer = selectedManufacturer ? selectedManufacturer['man_id'] : ''
        const model = selectedModel ? '.' + selectedModel['model_id'] : ''

        return { dealType: dealType ? dealType.value : '', params: manufacturer + model, category: selectedCategorie ? selectedCategorie['category_id'] : '' }
    }

    useEffect(() => {
        GetManufacturer()
            .then(res => {
                if(res && res.data) {
                    setManufacturerOptions(res.data);
                }
            })
            .catch(error =>  console.log(error))
    }, []);

    useEffect(() => {
        GetCategories()
            .then(res => {
                if(res && res.data) {
                    setCategorieOptions(res.data.data)
                }
            })
            .catch(error =>  console.log(error))
    }, []);

    useEffect(() => {
        if(selectedManufacturer) {
            setModelOptions(null);
            GetModels(selectedManufacturer['man_id'])
                .then(res => {
                    if(res.data && res.data.data) {
                        setModelOptions(res.data.data);
                    }
                })
                .catch(error => console.log(error))
        } else {
            setModelOptions(null);
            setSelectedModel(null);
        }
    }, [selectedManufacturer])

    const searchProductHandler = () => {
        const { dealType, params, category } = returnQueryParameters();
        searchProduct(dealType, params, category, priceRange);
    }

    return (
        <aside className={style.aside}>
            <div className={style.header}>
                <button className={style.active}>
                    <SVG id="car" />
                </button>
                <button>
                    <SVG id="tractor" />
                </button>
                <button>
                    <SVG id="moto" />
                </button>
            </div>
            <div className={style.container}>
                <div className={style.selectContainer}>
                    <div className={style.selectBox}>
                        <Select
                            optionKey="title"
                            options={[ { title: 'იყიდება', value: 0 }, { title: 'ქირავდება', value: 1 } ]}
                            label='გარიგების ტიპი'
                            placeholder='გარიგების ტიპი'
                            onChangeHandler={(item) => setDealType(item)}
                        />
                    </div>

                    <div className={style.selectBox}>
                        <Select
                            optionKey="man_name"
                            options={manufacturerOptions}
                            label='მწარმოებელი'
                            placeholder='ყველა მწარმოებელი'
                            onChangeHandler={(item) => setSelectedManufacturer(item)}
                        />
                    </div>

                    <div className={style.selectBox}>
                        <Select
                            optionKey="model_name"
                            options={modelOptions}
                            label='მოდელი'
                            placeholder='მოდელი'
                            onChangeHandler={(item) => setSelectedModel(item)}
                        />
                    </div>
                    <div className={style.selectBox} style={{ display: showCategorySelect ? 'block' : 'none' }}>
                        <Select
                            optionKey="title"
                            options={categorieOptions}
                            label='კატეგორია'
                            placeholder='ყველა კატეგორია'
                            onChangeHandler={(item) => setSelectedCategorie(item)}
                        />
                    </div>
                </div>
                <div>
                    <div className={`${style.priceFields} ${isDollarSelected ? style.isDollarSelected : ''}`}>
                        <p>ფასი</p>
                        <div
                            className={style.togglePrice}
                            onClick={() => {
                                updateCurrency();
                                setIsDollarSelected(!isDollarSelected)
                            }}
                        >
                            <div>
                                <SVG id="gel" isHover={isDollarSelected} />
                            </div>
                            <div>
                                <SVG id="dollar" isHover={isDollarSelected} />
                            </div>
                        </div>
                    </div>
                    <div className={style.inputFields}>
                        <div className={style.inputField}>
                            <input
                                type="text"
                                placeholder="დან"
                                value={priceRange.from}
                                onChange={(e) => setPriceRange({ ...priceRange, from: e.target.value })}
                            />
                        </div>
                        <div className={style.inputField}>
                            <input
                                type="text"
                                placeholder="მდე"
                                value={priceRange.to}
                                onChange={(e) => setPriceRange({ ...priceRange, to: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.filter}>
                    <button onClick={searchProductHandler}>
                        ძებნა { (selectedManufacturer || selectedModel || dealType) && products && products.meta.total }
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default memo(Filter);
