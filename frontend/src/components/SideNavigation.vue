<template>
  <section class="w-full p-5 lg:block ">
    <!-- Owned Projects -->
    <div class="flex flex-row items-center justify-between">
      <p class="text-xs text-gray-light">Owned Projects</p>

      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="cursor-pointer text-gray" @click="$router.push('/projects/create')">
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V7.75H17.25C18.3546 7.75 19.25 8.64543 19.25 9.75V12.25"
        ></path>
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M13.5 7.5L12.5685 5.7923C12.2181 5.14977 11.5446 4.75 10.8127 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V11"
        ></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 14.75V19.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 17L14.75 17"></path>
      </svg>
    </div>
    <div class="w-full h-px my-3 rounded-full bg-gray-lighter"></div>

    <div class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:w-auto" v-for="(item, index) in projects.owned" :key="index" @click="$emit('setActive', item)">
      <h1 class="mb-2 text-sm font-medium truncate font-heading">{{ item.name }}</h1>
      <p class="text-xs truncate text-gray-light">{{ item.description }}</p>
    </div>

    <!-- Shared Projects -->
    <template v-if="projects.shared.length">
      <p class="text-xs text-gray-light">Shared Projects</p>
      <div class="w-full h-px my-3 rounded-full bg-gray-lighter"></div>

      <div class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:w-auto" v-for="(item, index) in projects.shared" :key="index" @click="$emit('setActive', item)">
        <h1 class="mb-2 text-sm font-medium truncate font-heading">{{ item.name }}</h1>
        <p class="text-xs truncate text-gray-light">{{ item.description }}</p>
      </div>
    </template>
  </section>
</template>

<script>
  export default {
    name: 'SideNavigation',
    props: {
      projects: Object,
    },
    emits: ['setActive'],
  };
</script>
