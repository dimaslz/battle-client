<template>
  <div id="app" class="flex flex-col items-center w-full h-full">
    <div
      class="ForkMeOnGithub fixed top-0 right-0 mt-10 -mr-12 transform rotate-45 bg-gray-900"
    >
      <a
        href="https://github.com/dimaslz/battle-client"
        target="_blank"
        class="flex text-gray-300 hover:text-gray-100 px-10 py-1 border border-white my-1 border-dashed"
      >
        Fork me on GitHub
      </a>
    </div>
    <div class="text-3xl p-12 uppercase">
      Battle Click
    </div>
    <div class="text-sm p-4">
      Battle Click it is a small multiplayer game. There are 2 kind of games.

      <ul class="mt-3">
        <li class="text-left mt-2">
          <span class="font-semibold">- Game #1: </span>
          <span
            >In a board of 100 squares, you need to fill the maximum squares,
            more than your opponent in 30 seconds.</span
          >
        </li>
        <li class="text-left mt-2">
          <span class="font-semibold">- Game #2: </span>
          <span
            >In a board of 100 squares, you can fill any square as you want,
            your opponent will do the same. After 30 seconds, the game will
            finish, and you will get points per each square the is not match
            with your opponent.</span
          >
        </li>
      </ul>
    </div>

    <!-- // Your info -->
    <div class="text-sm p-2 border-b-4 border-green-600 bg-green-300 w-full">
      <span class="font-semibold">Your player ID: </span>
      <span>{{ userId }}</span>
    </div>

    <!-- // Create a room -->
    <div
      v-if="!$route.params.roomId"
      class="text-sm p-2 w-full h-full flex flex-col items-center"
    >
      <button
        @click="_createRoom()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Create room
      </button>
    </div>

    <div v-if="loading && !$route.params.roomId">creating room</div>
    <span v-if="$route.params.roomId" class="flex w-full flex-col mt-4 h-full">
      <router-view />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapActions, mapState } from "vuex";
import { uuid } from "@/utils";

export default Vue.extend({
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    this.setName(uuid());
  },
  computed: {
    ...mapState("me", {
      userId: (state: any) => state.name
    })
  },
  methods: {
    _createRoom() {
      this.createRoom().then((roomId: string) => {
        this.$router.push(`/${roomId}`);
        this.$socket.emit("create", { roomId });
      });
    },
    ...mapActions("game", ["createRoom"]),
    ...mapMutations("me", ["setName"])
  }
});
</script>

<style src="./assets/tailwind.css"></style>
<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
