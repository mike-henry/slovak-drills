<template>
  <div class="w-full h-full flex flex-col bg-slate-700 dark:bg-slate-300 rounded-xl overflow-hidden">
    <!-- Tools content -->
    <div v-if="open" class="p-4 flex-1 overflow-auto">
      <h3 class="font-semibold mb-2">Tools</h3>
    </div>
    <NounFilter />
    <!-- Grab  toggle handle -->
    <div class="flex items-center justify-center cursor-pointer bg-slate-600 dark:bg-slate-400" @click="toggle">
      <div class="w-8 h-1.5 my-2 bg-slate-400 rounded"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NounFilter from './NounFilter.vue';

const open = ref(true); // start open
function toggle() {
  open.value = !open.value;
}
</script>
