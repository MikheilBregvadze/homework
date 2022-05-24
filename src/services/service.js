import axios from "axios";

export const GetManufacturer = () => {
    return axios.get('http://static.my.ge/myauto/js/mans.json');
}

export const GetModels = (man_id) => {
    return axios.get(`https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`);
}

export const GetCategories = (categories = '') => {
    return axios.get(`https://api2.myauto.ge/ka/cats/get?Cats=${categories}`);
}

export const GetProducts = (dealType = '', model = '', category = '1', period = '', sortOrder= '') => {
    return axios.get(`https://api2.myauto.ge/ka/products/?ForRent=${dealType}&Mans=${model}&Cats=${category}&Period=${period}&SortOrder=${sortOrder}`);
}
