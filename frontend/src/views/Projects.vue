<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-col w-full h-full py-4 lg:flex-row">
      <SideNavigation v-bind:projects="projects" v-on:setActive="setActive" class="w-full p-5 lg:max-w-xs lg:block " />

      <section class="flex flex-col w-full p-3 lg:p-4">
        <div class="flex flex-col lg:flex-row lg:justify-between">
          <!-- Project -->
          <div>
            <h1 class="text-base font-semibold font-heading text-gray">{{ activeProject.name }}</h1>
            <p class="my-2 text-sm text-gray-light">{{ activeProject.description }}</p>
          </div>

          <!-- Project Menu -->
          <div v-if="isProjectOwner" class="flex flex-row justify-center mt-3 lg:mt-0">
            <p class="m-3 text-sm cursor-pointer text-gray-light " @click="createPallete()">Create Pallete </p>
            <p class="m-3 text-sm cursor-pointer text-gray-light " @click="editProject()">Edit </p>
            <p class="m-3 text-sm cursor-pointer text-gray-light" @click="editMembers()">Share</p>
            <p class="m-3 text-sm cursor-pointer text-gray-light" @click="deleteProject()">Delete</p>
          </div>
        </div>

        <section>
          <!-- Palette -->
          <div class="p-1 my-2 bg-white rounded shadow-sm cursor-pointer lg:p-5 " v-for="(item, index) in activeProject.palettes" :key="index">
            <div class="flex flex-row items-center justify-between">
              <h1 class="m-3 text-base font-medium font-heading ">{{ item.name }}</h1>

              <!-- Palette Menu -->
              <div v-if="isProjectOwner" class="flex flex-row items-center justify-center lg:mt-0">
                <p class="m-3 text-sm cursor-pointer text-gray-light " @click="addColor(item)">Add Color</p>
                <p class="m-3 text-sm cursor-pointer text-gray-light " @click="editPalette(item._id)">Edit</p>
                <p class="m-3 text-sm cursor-pointer text-gray-light" @click="deletePalette(item._id)">Delete</p>
              </div>
            </div>

            <!-- Colors Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-8 2xl:grid-cols-12">
              <div class="flex flex-row items-center justify-between p-2 lg:flex-col lg:w-auto " v-for="(itemColor, colorIndex) in item.colors" :key="colorIndex">
                <input v-model="activeProject.palettes[index].colors[colorIndex]" @change="updateColors(item)" class="w-20 h-20" type="color" :disabled="!isProjectOwner" />
                <h1 class="m-3 mb-2 text-sm font-medium text-center uppercase font-heading text-gray">{{ itemColor }}</h1>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="text-gray hover:text-gray-light" v-if="isProjectOwner" @click="deleteColor(item, itemColor)">
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
            this.activeProject = null;
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

      editMembers() {
        this.$router.push('/projects/' + this.activeProject._id + '/members');
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

    computed: {
      isProjectOwner: function() {
        return this.projects.owned.some((project) => project._id === this.activeProject._id);
      },
    },
    mounted() {
      this.getProjects();
    },
  };
</script>
