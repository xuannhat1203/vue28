import { getAllProduct } from "@/api/userApi";
const products = {
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }  
  },
  actions: {
    async getAllProduct({ commit }) {
      try {
        const products = await getAllProduct();
        commit("setProducts", products); 
      } catch (error) {
        console.log(error);
      }
    }
  }
};
export default products;
