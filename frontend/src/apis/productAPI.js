import axios from "axios";
import { baseURL, headers } from "./../backend";

const getAllProducts = async (pageNo) => {
    const data = await axios.get(`${baseURL}/products/?page=${pageNo}`, { headers, })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((e) => {
            console.error(e);
            return [];
        });
    return data;
}

const getProductsByCategory = async (category, pageNo) => {
    const data = await axios.get(`${baseURL}/products/?category=${category}&page=${pageNo}`)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((e) => {
            console.error(e);
            return [];
        });
    return data;
}

export { getAllProducts, getProductsByCategory };