<template functional>
  <div class="mt-4 h-full">
    <div class="p-4">
      This room is full. The game it is only for two players.
    </div>
    <div class="text-sm p-2 w-full h-full flex flex-col items-center">
      <button
        @click="$emit('createRoom')"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Create room
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
