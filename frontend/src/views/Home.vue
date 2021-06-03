<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-col items-center justify-center flex-grow w-full h-full">
      <div class="container flex flex-col items-center p-1 lg:flex-row lg:p-16 3xl:p-32">
        <div class="flex flex-col m-5 lg:flex-grow">
          <h1 class="mb-6 text-2xl font-bold tracking-tight font-heading lg:text-6xl text-gray">The simplest way to manage colors.</h1>
          <p class="mb-6 text-gray-light ">Create and manage color palettes between projects.</p>

          <div class="flex flex-col lg:flex-row">
            <button class="px-8 py-3 my-6 text-sm font-medium text-white rounded-xl lg:max-w-max bg-primary focus:outline-none" @click="$router.push('/generator')"
              >Start Generator</button
            >
            <button class="px-8 py-3 my-6 text-sm font-medium text-primary lg:ml-3 rounded-xl lg:max-w-max focus:outline-none" @click="$router.push('/auth')">Or, Sign In</button>
          </div>
        </div>

        <div class="w-full lg:w-5/6 lg:max-w-2xl">
          <img class="object-cover object-center rounded-lg " alt="hero" src="../assets/hero.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Home',
    components: {
      TopNavigation,
    },
  };
</script>
