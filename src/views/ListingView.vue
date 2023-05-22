<script lang="ts">
import type { Country } from '@/interfaces/country.interface';
import type { Product } from '@/interfaces/product.interface';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {

    },
    data() {
        return {
            countryList: [] as Country[],
            productToShip: {} as Product,
        }
    },
    methods: {
        async shipItem() {
            await axios.post("http://localhost:3000/products/create", this.productToShip).catch((err) => {
                alert(err);
            }).then((response) => {
                alert(response);
            });
        },
        async prepareImage(eventTarget: HTMLInputElement) {
            if (eventTarget != null) {
                if (eventTarget.files != null) {
                    const file = eventTarget.files[0];
                    const base64 = await this.imageToBase64(file);
                    this.productToShip.base64image = base64;
                }
            } else {
                alert('The submitted image is not eligible to be uploaded.');
            }
        },
        async imageToBase64(file: File): Promise<string> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onerror = reject
                reader.onload = () => {
                    resolve(reader.result as string)
                }
                reader.readAsDataURL(file)
            })
        },
    },
    async mounted() {
        this.countryList = await axios.get("http://localhost:3000/countries")
            .then((response) => {
                return response.data as Country[];
            });
    }
});

</script>
<style></style>
<template>
    <h5 class="card-title mb-3">List a product:</h5>
    <form id="form-validation" class="g-3 needs-validation" @submit.prevent="shipItem()" validate>
        <div class="row mb-3">
            <div class="col-md-5">
                <label for="productLabel" class="form-label">Product Name</label>
                <input v-model="productToShip.name" type="text" class="form-control" id="validationProductName" required>
            </div>
            <div class="col-md-4">
                <label for="validationPrice" class="form-label">Price (€)</label>
                <input v-model="productToShip.price" type="number" class="form-control" id="validationPrice"
                    placeholder="ex: 25.00" required>
            </div>
            <div class="col-md-3">
                <label for="validationStock" class="form-label">Units (un.)</label>
                <input v-model="productToShip.stock" type="number" class="form-control" id="validationStock"
                    placeholder="ex: 100" required>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12">
                <label for="validationDescription" class="form-label">Description</label>
                <textarea v-model="productToShip.description" type="text" class="form-control" id="validationDescription"
                    rows="5"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <img class="image-fluid rounded mx-auto d-block" style="width: 100%; height: 100%;"
                    v-if="productToShip.base64image != null" :src="productToShip.base64image">
                <svg v-else class="bd-placeholder-img figure-img img-fluid rounded" width="400" height="300"
                    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 400x300"
                    preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6"
                        dy=".3em"></text>
                </svg>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3">
                <label for="validationImage" class="form-label">Upload an image</label>

                <input id="validationImage" type="file" accept="image/*" class="form-control"
                    @change="prepareImage(($event.target as HTMLInputElement))">
            </div>

            <div class="col-md-9">
                <label for="validationCountry" class="form-label">Country</label>
                <select v-model="productToShip.shippingCountry" class="form-select" id="validationCountry" required>
                    <option selected disabled value="">Choose...</option>
                    <option v-for="country in countryList" :value="country.countryCode">{{ country.countryCode }} - {{
                        country.name }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <label for="validationAddress" class="form-label">Address</label>
                <input v-model="productToShip.shippingAddress" type="text" class="form-control" id="validationAddress"
                    placeholder="Building / Street / Floor nº / Door nº" required>
            </div>
            <div class="col-md-3">
                <label for="validationPostCode" class="form-label">Post Code</label>
                <input type="text" v-model="productToShip.shippingPostCode" class="form-control" id="validationPostCode"
                    required>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <button class="btn btn-dark" type="submit"><font-awesome-icon class="me-2" icon="fa-solid fa-paper-plane" />Ship
                item</button>
        </div>
    </form>
</template>