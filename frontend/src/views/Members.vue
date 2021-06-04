<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <section class="w-full p-4 bg-white shadow-lg lg:w-auto lg:p-8 lg:rounded-xl">
      <h1 class="my-1 text-lg font-medium text-gray font-heading">Edit project's members.</h1>
      <p class="my-2 text-sm text-gray-light"> Enter the member's email.</p>

      <div class="flex flex-col items-center justify-between w-full mt-8 ">
        <div class="w-full my-4">
          <p class="my-2 text-sm text-gray-light">Email</p>

          <input
            v-model="email"
            placeholder="... Member Email"
            class="block w-full px-3 py-3 text-sm border-transparent rounded bg-background text-gray placeholder-gray-light lg:w-80 focus:outline-none "
            autofocus
            autocomplete
          />
        </div>

        <button
          class="px-8 py-3 mx-5 my-5 text-sm text-white rounded lg:my-0 bg-primary disabled:bg-gray disabled:text-gray-light focus:outline-none"
          @click="addMember()"
          :disabled="!email.length"
          >Add Member</button
        >
      </div>
      <div class="my-9">
        <p class="text-xs text-gray-light">Project's Members</p>
        <div class="w-full h-px my-3 rounded-full bg-gray-lighter"></div>

        <div class="flex flex-row justify-between w-full my-6" v-for="(item, index) in members" :key="index">
          <p class="text-sm text-gray">{{ item.user.email }}</p>

          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="text-gray hover:text-gray-light" @click="deleteMember(item._id)">
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
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Members',
    data() {
      return {
        email: '',
        members: [],
      };
    },
    methods: {
      addMember() {
        if (!this.email) {
          return;
        }

        this.axios
          .post('/api/projects/' + this.$route.params.projectID + '/members', {
            email: this.email,
          })
          .then(() => {
            this.$router.go(-1);
          });
      },

      deleteMember(memberId) {
        this.axios.delete('/api/projects/' + this.$route.params.projectID + '/members/' + memberId).then(() => {
          this.$router.go(-1);
        });
      },

      getMembers(projectId) {
        this.axios
          .get('/api/projects/' + projectId + '/members')
          .then((payload) => {
            this.members = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      this.getMembers(this.$route.params.projectID);
    },
  };
</script>
