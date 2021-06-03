<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-row w-full h-full py-4">
      <SideNavigation v-bind:projects="projects" v-on:setActive="setActive" />

      <section class="flex flex-col w-full p-3 lg:p-4">
        <div class="flex flex-col lg:flex-row lg:justify-between">
          <!-- Project -->
          <div>
            <h1 class="text-base font-semibold font-heading text-gray">{{ activeProject.name }}</h1>
            <p class="my-2 text-sm text-gray-light">{{ activeProject.description }}</p>
          </div>

          <!-- Project Menu -->
          <div class="flex flex-row justify-center mt-3 lg:mt-0">
            <p class="m-3 text-sm cursor-pointer text-gray-light " @click="createPallete()">Create Pallete </p>
            <p class="m-3 text-sm cursor-pointer text-gray-light " @click="editProject()">Edit </p>
            <p class="m-3 text-sm cursor-pointer text-gray-light">Share</p>
            <p class="m-3 text-sm cursor-pointer text-gray-light" @click="deleteProject()">Delete</p>
          </div>
        </div>

        <section>
          <!-- Palette -->
          <div class="p-3 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-5 " v-for="(item, index) in activeProject.palettes" :key="index">
            <div class="flex flex-row items-center justify-between">
              <h1 class="mb-2 text-base font-medium font-heading ">{{ item.name }}</h1>

              <!-- Palette Menu -->
              <div class="flex flex-row justify-center mt-3 lg:mt-0">
                <p class="m-3 text-sm cursor-pointer text-gray-light " @click="editPalette(item._id)">Edit</p>
                <p class="m-3 text-sm cursor-pointer text-gray-light" @click="deletePalette(item._id)">Delete</p>
              </div>
            </div>

            <!-- Colors -->
            <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-12">
              <div
                class="flex flex-row items-center justify-between p-2 my-2 cursor-pointer lg:flex-col lg:p-5 lg:w-auto "
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
  import SideNavigation from '@/components/SideNavigation.vue';

  export default {
    name: 'Projects',
    components: {
      TopNavigation,
      SideNavigation,
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

      deleteProject() {
        this.axios
          .delete('/api/projects/' + this.activeProject._id)
          .then(() => {
            this.getProjects();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      editProject() {
        this.$router.push('/projects/' + this.activeProject._id);
      },

      setActive(item) {
        this.activeProject = item;
      },

      createPallete() {
        this.$router.push('/projects/' + this.activeProject._id + '/palletes/create');
      },

      editPalette(paletteId) {
        this.$router.push('/projects/' + this.activeProject._id + '/palletes/' + paletteId);
      },

      deletePalette(palleteId) {
        this.axios
          .delete('/api/projects/' + this.activeProject._id + '/palettes/' + palleteId)
          .then(() => {
            this.getProjects();
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
