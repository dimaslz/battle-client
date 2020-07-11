<template>
  <div id="room" class="flex w-full flex-col h-full">
    <!-- Winner overlay -->
    <div
      v-if="winner"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-green-500 bg-opacity-75 z-50 text-white"
    >
      <div class="text-4xl font-semibold">You have won!!</div>
    </div>
    <!-- // Winner overlay -->
    <!-- Loser overlay -->
    <div
      v-if="loser"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-red-500 bg-opacity-75 z-50 text-white"
    >
      <div class="text-4xl font-semibold">You have lost!!</div>
    </div>
    <!-- // Loser overlay -->

    <!-- // Room info -->
    <div class="p-2 text-center bg-gray-100">
      <span class="font-semibold">room: </span><span>{{ roomId }}</span>
    </div>

    <!-- // User is not joining a room -->
    <div v-if="!joined" class="mt-4 h-full">
      <div class="p-4">
        This room is full. The game it is only for two players.
      </div>
      <div class="text-sm p-2 w-full h-full flex flex-col items-center">
        <button
          @click="_createRoom()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Create room
        </button>
      </div>
    </div>

    <div v-if="joined" class="flex flex-col h-full">
      <!-- // Your opponent -->
      <div class="mt-4 p-2 text-right">
        <div v-if="opponentId">
          <span class="font-semibold">you are playing against: </span
          >{{ opponentId }}
        </div>
        <div v-if="!opponentId">
          waiting for opponent...
        </div>
      </div>

      <!-- // Scores -->
      <div class="flex">
        <div class="w-full p-4 bg-green-300">
          <span class="font-semibold">your score: </span
          ><span>{{ score }}</span>
        </div>
        <div class="w-full p-4 bg-red-300">
          <span class="font-semibold">opponent score: </span
          ><span>{{ opponentScore }}</span>
        </div>
      </div>

      <div class="flex p-4 items-center justify-center h-full">
        <div class="battle-field relative">
          <!-- <div
            v-if="!opponentId"
            class="flex w-full h-full z-10 absolute bg-gray-300 bg-opacity-50 top-0 left-0 items-center justify-center"
          >
            <span>
              wait for your opponent join the room
            </span>
          </div>
          <div
            v-if="countdown !== null"
            class="flex w-full h-full z-10 absolute bg-gray-300 bg-opacity-50 top-0 left-0 items-center justify-center"
          >
            <span class="text-6xl">
              {{ countdown }}
            </span>
          </div> -->
          <div
            v-if="countdown !== null"
            class="flex w-full h-full z-10 absolute bg-gray-300 bg-opacity-50 top-0 left-0 items-center justify-center"
          >
            <span class="text-6xl">
              {{ countdown }}
            </span>
          </div>

          <div
            v-if="!gameStarted"
            class="flex w-full h-full z-10 absolute bg-gray-300 bg-opacity-50 top-0 left-0 items-center justify-center"
          >
            <span>
              wait for your opponent join the room
            </span>
          </div>

          <div
            v-for="(row, rowIndex) of rows"
            :key="rowIndex"
            class="row"
            :dataset-row="rowIndex"
          >
            <div
              v-for="(col, colIndex) of cols"
              :key="colIndex"
              :class="[
                { 'border-l': colIndex === 0 },
                { 'border-t': rowIndex === 0 },
                'col border-b border-r'
              ]"
              @click="fill($event, rowIndex, colIndex)"
              :data-item="`${rowIndex}-${colIndex}`"
            ></div>
          </div>
        </div>
      </div>

      <!-- // Start new game -->
      <div class="text-sm p-2 w-full">
        <div class="text-sm p-2 w-full h-full flex flex-col items-center">
          <button
            @click="_createRoom()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Create new room
          </button>
        </div>
      </div>
      <!-- // Share link -->
      <div class="text-sm p-2 border-b-4 border-green-600 bg-green-300 w-full">
        <div class="flex flex-col items-center">
          Share the following link to your opponent: <br />
          <span class="font-semibold">{{ link }}</span>
        </div>
        <div class="flex flex-col items-center" v-if="false">
          Introduce the player ID of your opponent: <br />
          <form class="w-full max-w-sm">
            <div
              class="flex items-center border-b border-b-2 border-teal-500 py-2"
            >
              <input
                class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Jane Doe"
                aria-label="Full name"
              />
              <button
                class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                send challenge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      cols: [] as number[],
      rows: [] as number[],
      score: 0,
      opponentScore: 0,
      error: "",
      gameStarted: false,
      oponentJoined: false,
      gameFinished: false,
      countdown: null,
      link: "",
      winner: null,
      loser: null
    };
  },
  computed: {
    ...mapState({
      userId: (state: any) => state.me.name,
      joined: (state: any) => state.me.joined,
      opponentId: (state: any) => state.opponent.name,
      roomId: (state: any) => state.game.roomId,
      clientId: (state: any) => state.me.clientId
    })
  },
  created() {
    this.$socket.on("countdown-ping", (data: any) => {
      if (this.$data.countdown < 0) {
        this.$data.countdown = "GO!";
        setTimeout(() => {
          this.$data.countdown = null;
        }, 200);
      } else {
        setTimeout(() => {
          this.$data.countdown--;
          this.$socket.emit("countdown-pong", {
            userId: this.userId,
            roomId: this.roomId,
            countdown: this.$data.countdown
          });
        }, 1000);
      }
    });
    this.$socket.on("joined", (data: any) => {
      this.$data.oponentJoined = true;
      const userId = data.userId;
      this.opponentSetName(userId);

      setTimeout(() => {
        this.$data.cowntdown = 5;
        this.$socket.emit("start-game", {
          roomId: this.roomId
        });
      }, 200);
    });

    this.$socket.on("filled", (data: any) => {
      this.$data.opponentScore = data.score;
      const elementSelector = `[data-item='${data.row}-${data.col}']`;
      const item = document.querySelector(elementSelector);
      if (item) {
        item.classList.remove("filled");
        item.classList.add("filled--oponent");
      }
    });
    this.$socket.on("start-game", (data: any) => {
      this.$data.countdown = 5;
      this.$data.gameStarted = true;

      setTimeout(() => {
        this.$socket.emit("countdown-pong", {
          userId: this.userId,
          roomId: this.roomId,
          countdown: 4
        });
      }, 1000);
    });
    this.$socket.on("game-finished", (data: any) => {
      const winner = data[this.userId].winner;
      if (winner) {
        this.$data.winner = true;
      } else {
        this.$data.loser = true;
      }
    });
    this.$socket.on("reset-game", () => {
      this.createBoard();
      this.$data.winner = false;
      this.$data.loser = false;
      this.$data.opponentId = null;
      this.$data.score = 0;
      this.$data.opponentScore = 0;
      this.$data.countdown = null;
      this.$data.gameStarted = false;
      this.$data.oponentJoined = false;

      [...document.querySelectorAll("[data-item].col.filled")].forEach(
        element => {
          element.classList.remove("filled");
        }
      );
      [...document.querySelectorAll("[data-item].col.filled--oponent")].forEach(
        element => {
          element.classList.remove("filled--oponent");
        }
      );
    });
  },
  methods: {
    createBoard() {
      this.cols = [];
      this.rows = [];
      this.$nextTick(() => {
        this.cols = Array.from(Array(3).keys());
        this.rows = Array.from(Array(3).keys());
      });
    },
    _joinRoom() {
      const { roomId } = this.$route.params;

      this.joinRoom({ roomId }).then(() => {
        this.$data.loading = false;
        this.$data.room = roomId;
        this.$data.link = window.location.href;
        this.createBoard();
      });
    },
    fill($event: any, row: number, col: number) {
      const { roomId } = this.$route.params;

      const element = $event.target;
      const classList = [...element.classList];
      if (classList.includes("filled--oponent")) {
        this.$data.score += 2;
      } else if (
        !classList.includes("filled--oponent" && !classList.includes("filled"))
      ) {
        this.$data.score++;
      }

      element.classList.remove("filled--oponent");
      element.classList.add("filled");

      this.$socket.emit("fill", {
        roomId,
        userId: this.userId,
        data: { row, col },
        score: this.$data.score
      });
    },
    async _createRoom() {
      this.$data.score = 0;
      this.$data.opponentScore = 0;
      [...document.querySelectorAll("[data-item].col.filled")].forEach(
        element => {
          element.classList.remove("filled");
        }
      );
      [...document.querySelectorAll("[data-item].col.filled--oponent")].forEach(
        element => {
          element.classList.remove("filled--oponent");
        }
      );

      await this.leaveRoom();
      await this.createRoom().then((roomId: string) => {
        this.$router.push(`/${roomId}`);
        this.$socket.emit("create", { roomId });
        this.$data.room = roomId;
        this._joinRoom();
      });
    },
    ...mapMutations("me", {
      meUpdateScore: "updateScore"
    }),
    ...mapMutations("opponent", {
      opponentSetName: "setName"
    }),
    ...mapMutations("game", ["setRoomName"]),
    ...mapActions("game", ["createRoom", "leaveRoom", "joinRoom"])
  },
  async destroyed() {
    await this.leaveRoom();
    this.$socket.off(`countdown-ping`);
    this.$socket.off(`joined`);
    this.$socket.off(`filled`);
    this.$socket.off(`start-game`);
    this.$socket.off(`reset-game`);
    this.$socket.off(`game-finished`);
  },
  watch: {
    clientId: function() {
      console.log("DDFF", this.clientId);
      if (this.clientId) this._joinRoom();
    }
  }
});
</script>

<style lang="scss">
.battle-field {
  .row {
    display: flex;
  }
  .col {
    // border: 1px solid #999;
    width: 22px;
    height: 22px;

    &:hover {
      cursor: pointer;
      background-color: #cccccc;
    }
    &.filled {
      background-color: #cccccc;
      cursor: not-allowed;
      pointer-events: none;

      &--oponent {
        background-color: red;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
}
</style>
