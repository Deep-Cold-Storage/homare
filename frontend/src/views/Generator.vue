<template>
  <div class="flex flex-col w-full min-h-screen">
    <TopNavigation />

    <div class="flex flex-col items-center justify-between flex-grow w-full h-full">
      <div class="absolute flex flex-row justify-end w-full px-12">
        <div class="h-aut">
          <button class="px-8 py-3 my-6 text-sm text-white rounded-lg shadow-md lg:max-w-max bg-primary focus:outline-none" @click="getColors()"> Generate</button>

          <button class="px-8 py-3 mx-3 my-6 text-sm text-white rounded-lg shadow-md lg:max-w-max bg-primary focus:outline-none" @click="saveColors()"> Save</button>
        </div>
      </div>

      <div class="flex flex-col flex-grow w-full min-h-full lg:h-48 lg:flex-row">
        <div
          class="flex flex-col items-center justify-end w-full cursor-pointer h-60 lg:h-full"
          v-for="(item, index) in colors"
          :key="index"
          v-bind:style="item"
          @click="copyColor(item.backgroundColor)"
        >
          <section class="flex flex-row items-center p-3 m-3 bg-white rounded shadow-lg lg:p-3 lg:m-5 lg:w-auto">
            <h1 class="text-sm font-medium text-gray"> {{ item.backgroundColor }}</h1>
            <input v-model="colors[index].backgroundColor" class="w-10 h-10 ml-5" type="color" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var Color = require('color');
  import TopNavigation from '@/components/TopNavigation.vue';

  export default {
    name: 'Generator',
    components: {
      TopNavigation,
    },

    data() {
      return {
        colors: [],
      };
    },
    methods: {
      copyColor(hex) {
        navigator.clipboard.writeText(hex);
      },

      getColors() {
        this.axios
          .get('/api/colors')
          .then((payload) => {
            this.colors = [];

            let colors = [];
            for (let color of payload.data) {
              colors.push({ backgroundColor: Color.rgb(color).hex() });
            }

            this.colors = colors;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      saveColors() {
        return;
      },
    },
    mounted() {
      this.getColors();
    },
  };
</script>
