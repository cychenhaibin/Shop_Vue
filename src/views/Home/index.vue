<script setup>
import HomeCategory from "@/views/Home/component/HomeCategory.vue";
import HomeBanner from "@/views/Home/component/HomeBanner.vue";
import HomeNew from "@/views/Home/component/HomeNew.vue";
import HomeHot from "@/views/Home/component/HomeHot.vue";
import HomeProduct from "@/views/Home/component/HomeProduct.vue";
</script>

<template>
  <div class="container">
    <HomeCategory/>
    <HomeBanner/>
  </div>
  <HomeNew/>
  <HomeHot/>
  <HomeProduct/>
</template>

<style scoped>

</style>