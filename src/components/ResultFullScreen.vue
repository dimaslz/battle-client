<template>
  <div
    class="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-opacity-75 z-50 text-white"
    :class="[
      { 'bg-green-500': status === 'winner' },
      { 'bg-red-500': status === 'loser' }
    ]"
  >
    <div class="text-4xl font-semibold">{{ title }}</div>
    <div class="flex items-center justify-center">
      <button
        class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="$emit('reload')"
      >
        reload match
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "winner"
    }
  }
});
</script>
