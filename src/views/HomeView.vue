<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Product } from '@/interfaces/product.interface';
export default defineComponent({
  props: {

  },
  data() {
    return {
      productList: [] as Product[],
    }
  },
  async mounted() {
    this.productList =
      await axios.get("http://localhost:3000/products")
        .then((response) => {
          return response.data as Product[];
        });
  }
});
</script>
<style></style>
<template>
  <div class="container">
    <div class="list-group">
      <a v-if="productList != null" v-for="product in productList" href="#"
        class="list-group-item list-group-item-action shadow p-3 mb-2 bg-body rounded" aria-current="true">
        <div class="row">
          <div class="col-md-1 border-end">
            <img class="img-fluid w-100" :src="product.base64image">

          </div>
          <div class="col-md-11">
            <div class="row">
              <div class="d-flex w-100 justify-content-between mb-3">
                <h5 class="mb-1 fw-bolder">{{ product.name }}</h5>
                <small>Listed: 3 days ago</small>
              </div>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">Price: € {{ product.price }}</h6>
              <span v-if="product.stock > 20" class="badge bg-dark">In stock</span>
              <span v-else class="badge bg-danger">{{ product.stock }} un(s) left!</span>
            </div>
            <small class="mb-1">{{ product.description }}</small>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
