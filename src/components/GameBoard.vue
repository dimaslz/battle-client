<template>
  <div class="BattleBoard">
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
          'col border-b border-r h-6 w-6 cursor-pointer hover:bg-gray-300'
        ]"
        @click="
          $event => $emit('fill', { $event, row: rowIndex, col: colIndex })
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
      default: () => []
    },
    cols: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style lang="scss">
.BattleBoard {
  .col {
    &.filled {
      // stylelint-disable
      @apply bg-gray-500 cursor-not-allowed pointer-events-none;

      &--oponent {
        @apply bg-red-500 cursor-not-allowed pointer-events-none;
      }
    }
  }
}
</style>
