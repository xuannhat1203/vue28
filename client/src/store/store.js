import { getAllProduct } from "@/api/userApi";
import { createStore } from "vuex";
import products from "./modules/product";
import carts from "./modules/carts";
const store = createStore({
    modules:{
        products: products,
        carts:carts,
    }
})
export default store;