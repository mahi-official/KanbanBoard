import axios from "axios";
import { baseURL } from "./utils";


export interface Product {
    id: number;
    product_id: string;
    productImgUrl: string;
    name: string;
    desc: string;
    price: number;
    status: boolean;
    quantity: number;
    category: number;
}

export const getAllProducts = async (reqPage: number = 1) => {
    const data = await axios.get(`${baseURL}/products/?page=${reqPage}`)
        .then((response: any) => {
            if (response.status === 200) {
                if (response.data) {
                    let products: Product[] = response.data.results;
                    let count: number = response.data.count;
                    return {"products": products, "count": count};
                }
                return {"products": [], "count": 0};
            }
        })
        .catch((e) => {
            console.error(e);
            return {"products": [], "count": 0};
        });
    return data;
}


export const getProductsByCategory = async (category: string, page:number = 1) => {
    const data = await axios.get(`${baseURL}/products/?category=${category}&page=${page}`)
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