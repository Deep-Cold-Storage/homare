<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-row w-full h-full py-4">
      <section class="hidden w-full max-w-xs p-5 lg:block ">
        <!-- Owned Projects -->
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

        <!-- Shared Projects -->
        <template v-if="projects.shared.length">
          <p class="text-xs text-gray-light">Shared with You</p>

          <div class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:w-auto lg:rounded-xl" v-for="(item, index) in projects.shared" :key="index">
            <h1 class="mb-2 text-sm font-medium font-heading ">{{ item.name }}</h1>
            <p class="text-xs text-gray-light">{{ item.description }}</p>
          </div>
        </template>
      </section>

      <section class="flex flex-col w-full p-5">
        <div class="flex flex-col lg:flex-row lg:justify-between">
          <!-- Project -->
          <div>
            <h1 class="text-base font-semibold font-heading text-gray">{{ activeProject.name }}</h1>
            <p class="my-2 text-sm text-gray-light">{{ activeProject.description }}</p>
          </div>

          <!-- Project Menu -->
          <div class="flex flex-row justify-center mt-3 lg:mt-0">
            <p class="m-3 text-sm text-gray-light">Edit</p>
            <p class="m-3 text-sm text-gray-light">Share (2 Members)</p>
            <p class="m-3 text-sm text-gray-light">Delete</p>
          </div>
        </div>

        <section>
          <!-- Palette -->
          <div class="p-3 my-3 bg-white rounded shadow-sm cursor-pointer lg:p-5 lg:rounded-xl" v-for="(item, index) in activeProject.palettes" :key="index">
            <h1 class="mb-2 text-sm font-medium font-heading ">{{ item.name }}</h1>

            <!-- Colors -->
            <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-12">
              <div
                class="flex flex-row items-center justify-between p-2 my-2 cursor-pointer lg:flex-col lg:p-5 lg:w-auto lg:rounded-xl"
                v-for="(item, colorIndex) in item.colors"
                :key="colorIndex"
              >
                <input v-model="activeProject.palettes[index].colors[colorIndex]" class="w-20 h-20 ml-3" type="color" />
                <h1 class="m-3 mb-2 text-sm font-medium text-center font-heading ">{{ item }}</h1>
              </div>
            </div>
          </div>
        </section>
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

            this.activeProject = this.projects.owned[0];
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
