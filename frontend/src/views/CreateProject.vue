<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <section class="w-full p-4 bg-white shadow-lg lg:w-auto lg:p-8 lg:rounded-xl">
      <h1 class="my-1 text-lg font-medium text-gray font-heading">Create a new project.</h1>
      <p class="my-2 text-sm text-gray-light"> Enter the project's name and description.</p>

      <div class="flex flex-col items-center justify-between w-full mt-8 ">
        <div class="w-full my-4">
          <p class="my-2 text-sm text-gray-light">Name</p>

          <input
            v-model="project.name"
            placeholder="... Project Name"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light lg:w-80 focus:outline-none "
            autofocus
            autocomplete
          />
        </div>

        <div class="w-full my-4">
          <p class="my-2 text-sm text-gray-light">Description</p>

          <input
            v-model="project.description"
            placeholder="... Project Description"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light lg:w-80 focus:outline-none "
            autofocus
            autocomplete
          />
        </div>

        <button
          class="px-8 py-3 mx-5 my-5 text-sm text-white rounded lg:my-0 bg-primary disabled:bg-gray disabled:text-gray-light focus:outline-none"
          @click="createProject()"
          :disabled="!project.name.length"
          >Create Project</button
        >
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        project: { name: '', description: '' },
      };
    },
    methods: {
      createProject() {
        if (!this.project.name) {
          return;
        }

        this.axios
          .post('/api/projects', {
            name: this.project.name,
            description: this.project.description,
          })
          .then(() => {
            this.$router.go(-1);
          });
      },
    },
  };
</script>
