<template>
  <header class="static flex flex-row items-center justify-between p-5 md:px-20 md:py-6 bg-primary-light">
    <h1 class="py-2 font-medium cursor-pointer text-gray md:text-xl" @click="$router.push('/').catch((err) => {})">🦄 Homare</h1>

    <nav class="flex items-center justify-center">
      <router-link class="mx-5 text-sm text-gray hover:text-gray-light" to="/generator">Generator</router-link>
      <router-link v-if="logged" class="mx-5 text-sm text-gray hover:text-gray-light" to="/projects">Projects</router-link>
      <router-link v-if="!logged" class="mx-5 text-sm text-gray hover:text-gray-light" to="/auth">Sign In</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'TopNavigation',
    data() {
      return {
        logged: false,
      };
    },
    mounted() {
      if (localStorage.token) {
        this.logged = true;
      }
    },
  };
</script>
