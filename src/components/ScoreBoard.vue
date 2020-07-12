<template>
  <div class="flex">
    <div class="w-full p-4 bg-green-300">
      <span class="font-semibold">your score: </span>
      <span>{{ yourScore }}</span>
    </div>
    <div class="w-full p-4 bg-red-300">
      <span class="font-semibold">opponent score: </span>
      <span>{{ opponentScore }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    yourScore: {
      type: Number,
      default: 0
    },
    opponentScore: {
      type: Number,
      default: 0
    }
  }
});
</script>
