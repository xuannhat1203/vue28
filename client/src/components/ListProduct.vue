<template>
  <div class="container">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h1 class="panel-title">List Product</h1>
      </div>
      <div class="panel-body">
        <div class="product-list">
          <div
            v-for="(product, index) in listData"
            :key="product.id"
            class="product-item"
          >
            <img
              :src="product.imageUrl"
              alt="Product Image"
              class="product-image"
            />
            <div class="product-details">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <p><strong>Total:</strong> {{ product.quantity }}</p>
            </div>
            <div class="product-actions">
              <input
                type="number"
                class="quantity-input"
                v-model="productQuantities[index]"
                min="0"
              />
              <p>Price: $ {{ product.price }}</p>
              <button class="btn btn-primary" @click="addToCart(product, productQuantities[index])">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const productQuantities = ref([]); 
const store = useStore();

const addToCart = (product, quantity) => {
  const newProduct = {
    productId: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: quantity,
    imageUrl: product.imageUrl,
  };
  store.dispatch("addCart", newProduct);
};

const listData = computed(() => store.state.products.products);

onMounted(() => {
  store.dispatch("getAllProduct");
  productQuantities.value = listData.value.map(() => 0);
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

.product-list {
  margin-top: 20px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-actions {
  text-align: right;
}

.quantity-input {
  width: 50px;
  text-align: center;
  margin-bottom: 10px;
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
</style>
