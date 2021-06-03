<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-row w-full h-full py-4">
      <SideNavigation v-bind:projects="projects" v-on:setActive="setActive" class="hidden w-full max-w-xs p-5 lg:block " />

      <section class="flex flex-col w-full p-3 lg:p-4">
        <div class="flex flex-col lg:flex-row lg:justify-between">
          <!-- Project -->
          <div class="flex flex-row items-center justify-between">
            <div>
              <h1 class="text-base font-semibold font-heading text-gray">{{ activeProject.name }}</h1>
              <p class="my-2 text-sm text-gray-light">{{ activeProject.description }}</p>
            </div>

            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" class="m-4 cursor-pointer lg:hidden text-gray" @click="$router.push('/navigation')">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M5.75 19.2502H9.25C9.80229 19.2502 10.25 18.8025 10.25 18.2502V5.75C10.25 5.19772 9.80229 4.75 9.25 4.75H5.75C5.19772 4.75 4.75 5.19772 4.75 5.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"
              ></path>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M14.75 10.2502H18.25C18.8023 10.2502 19.25 9.80253 19.25 9.25025V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H14.75C14.1977 4.75 13.75 5.19772 13.75 5.75V9.25025C13.75 9.80253 14.1977 10.2502 14.75 10.2502Z"
              ></path>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M14.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V14.75C19.25 14.1977 18.8023 13.75 18.25 13.75H14.75C14.1977 13.75 13.75 14.1977 13.75 14.75V18.2502C13.75 18.8025 14.1977 19.2502 14.75 19.2502Z"
              ></path>
            </svg>
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
          <div class="p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-5 " v-for="(item, index) in activeProject.palettes" :key="index">
            <div class="flex flex-row items-center justify-between">
              <h1 class="m-3 text-base font-medium font-heading ">{{ item.name }}</h1>

              <!-- Palette Menu -->
              <div class="flex flex-row items-center justify-center lg:mt-0">
                <p class="m-3 text-sm cursor-pointer text-gray-light " @click="addColor(item)">Add Color</p>
                <p class="m-3 text-sm cursor-pointer text-gray-light " @click="editPalette(item._id)">Edit</p>
                <p class="m-3 text-sm cursor-pointer text-gray-light" @click="deletePalette(item._id)">Delete</p>
              </div>
            </div>

            <!-- Colors -->
            <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-12">
              <div class="flex flex-row items-center justify-between p-2 lg:flex-col lg:w-auto " v-for="(itemColor, colorIndex) in item.colors" :key="colorIndex">
                <input v-model="activeProject.palettes[index].colors[colorIndex]" @change="updateColors(item)" class="w-20 h-20" type="color" />
                <h1 class="m-3 mb-2 text-sm font-medium text-center font-heading text-gray">{{ itemColor }}</h1>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="text-gray hover:text-gray-light" @click="deleteColor(item, itemColor)">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6.75 7.75L7.59115 17.4233C7.68102 18.4568 8.54622 19.25 9.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 7.5V6.75C9.75 5.64543 10.6454 4.75 11.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.5"
                  ></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 7.75H19"></path>
                </svg>
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

            if (!this.activeProject) {
              this.activeProject = this.projects.owned[0];
            }
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

      addColor(palette) {
        if (!palette.colors) {
          palette.colors = [];
        }

        palette.colors.push('#FFFFFF');

        this.axios
          .patch('/api/projects/' + this.activeProject._id + '/palettes/' + palette._id, { name: palette.name, colors: palette.colors })
          .then(() => {
            this.getProjects();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      updateColors(palette) {
        this.axios.patch('/api/projects/' + this.activeProject._id + '/palettes/' + palette._id, { name: palette.name, colors: palette.colors }).catch((err) => {
          console.log(err);
        });
      },

      deleteColor(palette, color) {
        palette.colors = palette.colors.filter((x) => String(x) !== String(color));

        this.axios.patch('/api/projects/' + this.activeProject._id + '/palettes/' + palette._id, { name: palette.name, colors: palette.colors }).catch((err) => {
          console.log(err);
        });
      },
    },
    mounted() {
      this.getProjects();
    },
  };
</script>
