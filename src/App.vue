<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <nav class="navbar navbar-expand-lg navbar-dark bg-black">

        <a class="navbar-brand ms-3" href="#">
          <img id="brand" alt="Logo" class="logo" src="@/assets/basedLogo.svg" />

        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item me-2"><router-link class="btn btn-danger" to="/" tag="button"><font-awesome-icon
                  class="me-1" icon="fa-solid fa-fire" />Hot
                Deals!</router-link></li>
            <li class="nav-item me-2"><router-link class="btn btn-outline-light" to="/listing"
                tag="button"><font-awesome-icon class="me-1" icon="fa-solid fa-scale-balanced" />Ship an
                item</router-link></li>
          </ul>
          <form class="d-flex">
            <div class="input-group me-2">
              <input type="text" class="form-control" placeholder="Search">
              <button class="btn btn-outline-light"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </div>
            <button type="button" class="btn btn-outline-light me-2"><font-awesome-icon
                icon="fa-solid fa-truck-fast" /></button>
            <button type="button" class="btn btn-outline-light me-2"><font-awesome-icon
                icon="fa-solid fa-cart-shopping" /></button>
            <button class="btn btn-outline-light me-2"><font-awesome-icon icon="fa-solid fa-user" /></button>
          </form>
        </div>

      </nav>
    </div>

    <div class="row">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
</template>

<style scoped>
#brand {
  width: 12vw;
  height: auto;
  padding-right: 1vw;
  padding-left: 2vw;
}

.bg-black {
  background-color: black;
}
</style>
