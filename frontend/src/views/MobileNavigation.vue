<template>
  <dev class="flex flex-col w-full h-full bg-background">
    <TopNavigation />
    <SideNavigation v-bind:projects="projects" v-on:setActive="setActive" />
  </dev>
</template>

<script>
  import SideNavigation from '@/components/SideNavigation.vue';
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'MobileNavigation',
    components: {
      SideNavigation,
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

    setActive(item) {
      this.activeProject = item;
    },

    mounted() {
      this.getProjects();
    },
  };
</script>
