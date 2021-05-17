<template>
  <div class="flex flex-col items-center justify-between w-full h-full">
    <div class="flex flex-row justify-end w-full px-12"
      ><button class="px-8 py-3 my-6 text-sm font-medium text-white rounded-xl lg:max-w-max bg-primary focus:outline-none" @click="getColors()"
        ><svg class="hidden w-6 h-6 lg:inline lg:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        Generate</button
      >

      <button class="px-8 py-3 mx-3 my-6 text-sm font-medium text-white rounded-xl lg:max-w-max bg-primary focus:outline-none"
        ><svg class="hidden w-6 h-6 lg:inline lg:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Save</button
      >
    </div>

    <div class="flex flex-col flex-grow w-full h-60 lg:h-48 lg:flex-row">
      <div
        class="flex flex-col items-center justify-end w-full h-full cursor-pointer"
        v-for="(item, index) in colors"
        :key="index"
        v-bind:style="item"
        @click="copyColor(item.backgroundColor)"
      >
        <section class="flex flex-row p-3 m-3 bg-white rounded shadow-lg lg:p-5 lg:m-5 lg:w-auto lg:rounded-xl">
          <h1 class="text-base font-medium"> {{ item.backgroundColor }}</h1>
          <input v-model="colors[index].backgroundColor" class="ml-3" type="color" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  var Color = require('color');

  export default {
    name: 'Generator',
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
    },
    mounted() {
      this.getColors();
    },
  };
</script>
