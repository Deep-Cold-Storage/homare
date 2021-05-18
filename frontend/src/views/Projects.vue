<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-row w-full h-full py-4">
      <section class="hidden w-full max-w-xs p-5 lg:block ">
        <p class="text-xs text-gray-light">Owned Projects</p>
        <button class="block px-8 py-3 my-6 text-sm font-medium text-center text-white rounded-xl lg:max-w-max bg-primary focus:outline-none">Create Project</button>

        <div
          class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:w-auto lg:rounded-xl"
          v-for="(item, index) in projects.owned"
          :key="index"
          @click="activeProject = item"
        >
          <h1 class="mb-2 text-sm font-medium font-heading ">{{ item.name }}</h1>
          <p class="text-xs text-gray-light">{{ item.description }}</p>
        </div>

        <template v-if="projects.shared.length">
          <p class="text-xs text-gray-light">Shared with You</p>

          <div class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:w-auto lg:rounded-xl" v-for="(item, index) in projects.shared" :key="index">
            <h1 class="mb-2 text-sm font-medium font-heading ">{{ item.name }}</h1>
            <p class="text-xs text-gray-light">{{ item.description }}</p>
          </div>
        </template>
      </section>

      <section class="flex flex-col w-full p-5">
        <div class="flex flex-row justify-between">
          <div>
            <h1 class="text-base font-semibold font-heading text-gray">{{ activeProject.name }}</h1>
            <p class="my-2 text-sm text-gray-light">{{ activeProject.description }}</p>
          </div>

          <div class="flex flex-row">
            <p class="m-3 text-sm text-gray-light">Edit</p>
            <p class="m-3 text-sm text-gray-light">Share (2 Members)</p>
            <p class="m-3 text-sm text-gray-light">Delete</p>
          </div>
        </div>

        <section> </section>
      </section>
    </div>
  </div>
</template>

<script>
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Projects',
    components: {
      TopNavigation,
    },

    data() {
      return {
        projects: { owned: [], shared: [] },
        activeProject: {},
      };
    },
    methods: {
      getProjects() {
        this.axios
          .get('/api/projects')
          .then((payload) => {
            this.projects = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      this.getProjects();
    },
  };
</script>
