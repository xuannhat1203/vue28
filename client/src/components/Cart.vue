<template>
  <div class="container">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h1 class="panel-title">Shopping cart</h1>
      </div>
      <div class="panel-body">
        <div class="cart-items">
          <div v-for="(item, index) in listCart" :key="item.id" class="cart-item">
            <img :src="item.imageUrl" alt="Product Image" class="cart-image" />
            <div class="cart-details">
              <h3>{{ item.name }}</h3>
              <p>Price: ${{ (item.price || 0).toFixed(2) }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <div class="cart-actions">
                <input
                  type="number"
                  class="quantity-input"
                  v-model="productQuantities[index]"
                  min="1"
                />
                <button class="btn btn-primary" @click="updateProduct(item, productQuantities[index])">
                  Update
                </button>
                <a @click.prevent="removeItem(item)" class="remove-link">Remove</a>
              </div>
            </div>
          </div>
        </div>
        <div class="subtotal">
          <h4>Subtotal: {{ total }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productQuantities = ref([]); 
const listCart = computed(() => store.state.carts.carts);
const total = computed(() => {
  return listCart.value.reduce((accum, item) => {
    const quantity = item.quantity || 0;
    return accum + ((item.price || 0) * quantity);
  }, 0);
});

const updateProduct = (item, quantity) => {
  store.dispatch("updateCart", { product: item, quantity: quantity });
};
const removeItem = async(item) => {
  store.dispatch("deleteProduct", { id: item.id });
  await store.dispatch("getCart");
};
onMounted(() => {
  store.dispatch("getCart");
  productQuantities.value = listCart.value.map(item => item.quantity);
});
</script>

<style scoped>
.container {
  margin: 20px;
}

.panel {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.panel-heading {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.panel-title {
  margin: 0;
}

.cart-items {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.cart-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.cart-details {
  flex: 1;
}

.cart-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-input {
  width: 50px;
  text-align: center;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.remove-link {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.remove-link:hover {
  text-decoration: underline;
}

.subtotal {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
