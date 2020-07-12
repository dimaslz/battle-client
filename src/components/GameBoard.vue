<template>
  <div>
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
