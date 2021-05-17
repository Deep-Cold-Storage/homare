<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="container flex flex-col items-center p-1 lg:flex-row lg:p-32">
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

      <div class="w-full lg:w-5/6 lg:max-w-lg">
        <img class="object-cover object-center rounded-lg " alt="hero" src="https://dummyimage.com/720x600/F3F4F7/8693ac" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>
