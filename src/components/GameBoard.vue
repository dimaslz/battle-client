<template>
  <div class="GameBoard flex items-center flex-col">
    <div
      v-for="(row, rowIndex) of rows"
      :key="rowIndex"
      class="row flex"
      :dataset-row="rowIndex"
    >
      <div
        v-for="(col, colIndex) of cols"
        :key="colIndex"
        :class="[
          { 'border-l': colIndex === 0 },
          { 'border-t': rowIndex === 0 },
          'col border-b border-r h-8 w-8 cursor-pointer hover:bg-gray-300',
        ]"
        @click="
          ($event) => $emit('fill', { $event, row: rowIndex, col: colIndex })
        "
        :data-item="`${rowIndex}-${colIndex}`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    rows: {
      type: Array,
      default: () => [] as any[],
    },
    cols: {
      type: Array,
      default: () => [] as any[],
    },
  },
});
</script>

<style lang="scss">
.GameBoard {
  .col {
    &.filled {
      @apply bg-gray-500 cursor-not-allowed pointer-events-none;

      &--oponent {
        @apply bg-red-500 cursor-not-allowed pointer-events-none;
      }
    }
  }
}
</style>
