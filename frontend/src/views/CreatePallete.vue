<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <section class="w-full p-4 bg-white shadow-lg lg:w-auto lg:p-8 lg:rounded-xl">
      <h1 class="my-1 text-lg font-medium text-gray font-heading">Create a new pallete.</h1>
      <p class="my-2 text-sm text-gray-light"> Enter the pallete's name.</p>

      <div class="flex flex-col items-center justify-between w-full mt-8 ">
        <div class="w-full my-4">
          <p class="my-2 text-sm text-gray-light">Name</p>

          <input
            v-model="pallete.name"
            placeholder="... Pallete Name"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light lg:w-80 focus:outline-none "
            autofocus
            autocomplete
          />
        </div>

        <button
          class="px-8 py-3 mx-5 my-5 text-sm text-white rounded lg:my-0 bg-primary disabled:bg-gray disabled:text-gray-light focus:outline-none"
          @click="createPallete()"
          :disabled="!pallete.name.length"
          >Create / Update Palette</button
        >
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'CreatePallete',
    data() {
      return {
        pallete: { name: '' },
      };
    },
    props: {
      editMode: Boolean,
    },

    methods: {
      createPallete() {
        if (!this.pallete.name) {
          return;
        }

        if (this.editMode) {
          this.axios
            .patch('/api/projects/' + this.$route.params.projectID + '/palettes/' + this.pallete._id, {
              name: this.pallete.name,
            })
            .then(() => {
              this.$router.go(-1);
            });
        }

        if (!this.editMode) {
          this.axios
            .post('/api/projects/' + this.$route.params.projectID + '/palettes', {
              name: this.pallete.name,
              colors: this.pallete.colors,
            })
            .then(() => {
              this.$router.go(-1);
            });
        }
      },

      getProject(id) {
        this.axios
          .get('/api/projects/' + id)
          .then((payload) => {
            this.pallete = payload.data.palettes.filter((x) => String(x._id) == String(this.$route.params.palleteID))[0];
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      if (this.editMode) {
        this.getProject(this.$route.params.projectID);
      }
    },
  };
</script>
