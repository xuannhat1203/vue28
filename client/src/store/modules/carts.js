import { addCart, deleteCart, getCart, updateCart } from "@/api/cartApi";

const carts = {
  state: {
    carts: [],
  },
  mutations: {
    setCarts(state, products) {
      state.carts = products;
    },
    updateCartItem(state, updatedItem) {
      const index = state.carts.findIndex(
        (product) => product.productId === updatedItem.productId
      );
      if (index !== -1) {
        state.carts.splice(index, 1, updatedItem);
      }
    },
    addCartItem(state, newItem) {
      state.carts.push(newItem);
    },
    deleteCartItem(state, productId) {
      const index = state.carts.findIndex(
        (product) => product.productId === productId
      );
      if (index !== -1) {
        state.carts.splice(index, 1);
      }
    },
  },
  actions: {
    async getCart({ commit }) {
      try {
        const carts = await getCart();
        commit("setCarts", carts);
      } catch (error) {
        console.log(error);
      }
    },
    async addCart({ commit, state }, payload) {
      try {
        const checkCart = state.carts.find(
          (product) => product.productId === payload.productId
        );
        if (checkCart) {
          const updatedCart = {
            ...checkCart,
            quantity: checkCart.quantity + payload.quantity,
          };
          await updateCart(updatedCart.id, updatedCart);
          commit("updateCartItem", updatedCart);
        } else {
          await addCart(payload);
          commit("addCartItem", payload);
        }
        const updatedCarts = await getCart();
        commit("setCarts", updatedCarts);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCart({ commit }, payload) {
      try {
        const update = {
          ...payload.product,
          quantity: payload.quantity,
        };
        await updateCart(payload.product.id, update);
        commit("updateCartItem", update); 
        const updatedCarts = await getCart();
        commit("setCarts", updatedCarts);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct({ commit }, payload) {
      console.log(payload);
      
      try {
        await deleteCart(payload.id);
        commit("deleteCartItem", payload.id);
        const updatedCarts = await getCart();
        commit("setCarts", updatedCarts);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default carts;
