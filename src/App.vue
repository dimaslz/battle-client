<template>
  <div
    id="app"
    class="flex flex-col items-center w-full h-full antialiased text-sm font-sans"
  >
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
      Battle Board
    </div>
    <div class="text-sm p-4">
      <p>
        Battle Board it is a small multiplayer game. At the moment just one game
        availible, but I will ad new as soon as possible.
      </p>

      <ul class="mt-3">
        <li class="text-left mt-2">
          <h3 class="font-semibold">Game</h3>
          <div>
            <ul class="list-disc ml-8">
              <li>
                Choose the number of squares of the board (3x3, 6x6, 10x10)
                (battle board).
              </li>
              <li>Once you decide the size, click on "create room" button.</li>
              <li>You will have the message "Waiting for an opponent".</li>
              <li>
                Share the link with a friend and after will start a counter.
              </li>
              <li>
                When the counter says "Go!", you need to click each square.
              </li>
              <li>
                The player with most squared clicked will win the battle.
              </li>
            </ul>
          </div>
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
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          State
        </label>
        <div class="relative">
          <select
            class="cursor-pointer block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            v-model="size"
          >
            <option value="9">3x3</option>
            <option value="36">6x6</option>
            <option value="100">10x10</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>

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
      loading: false,
      size: 9
    };
  },
  async mounted() {
    this.setName(uuid());
  },
  computed: {
    ...mapState("me", {
      userId: (state: any): string => state.name
    })
  },
  methods: {
    _createRoom() {
      this.loading = true;
      this.createRoom(this.size).then((roomId: string) => {
        this.$router.push(`/${roomId}`);
        this.$socket.emit("create", { roomId });
        this.loading = false;
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
}
</style>
