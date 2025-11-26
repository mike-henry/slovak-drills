<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold mb-2">History</h2>

    <ul class="history-list">
      <li
        v-for="(item, index) in history"
        :key="index"
      >
        <span v-if="item.correct" class="text-emerald-500">✓</span>
        <span v-else class="text-rose-500">✗</span>
        {{ item.word }} → {{ item.answer }} : {{ item.expected }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const { history } = defineProps({
  history: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.4);
  border-radius: 3px;
}
</style>
