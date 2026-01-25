<template>
  <div ref="root" class="relative w-full h-full overflow-hidden h-screen">
    <!-- MAIN -->
    <div class="absolute inset-0 overflow-auto" :style="{ paddingBottom: toolsHeight + dividerHeight + 'px' }">
      <slot name="main" />
    </div>

    <!-- DIVIDER -->
    <div
      class="absolute left-0 right-0 h-3 cursor-row-resize z-20 bg-gradient-to-b from-slate-600/70 to-slate-700/70 dark:from-slate-300/70 dark:to-slate-400/70 hover:from-slate-500 hover:to-slate-600 dark:hover:from-slate-200 dark:hover:to-slate-300 transition-colors"
      :style="{ bottom: toolsHeight + 'px' }"
      @mousedown="startDrag"
      @dblclick.stop.prevent="toggleTools"
    >
      <!-- grab handle -->
      <div class="flex justify-center items-center h-full">
        <div class="w-10 h-1.5 rounded-full bg-slate-300/80 dark:bg-slate-600/80" />
      </div>
    </div>

    <!-- TOOLS -->
    <div
      class="absolute left-0 right-0 bottom-0 bg-slate-700 dark:bg-slate-300"
      :style="{ height: toolsHeight + 'px' }"
    >
      <slot name="tools" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const toolsHeight = ref(0);
const dividerHeight = 8;
const dragging = ref(false);
let startY = 0;
let startHeight = 0;

const DEFAULT_TOOLS_HEIGHT = 100;

function startDrag(e) {
  dragging.value = true;
  startY = e.clientY;
  startHeight = toolsHeight.value;

  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  const dy = startY - e.clientY; // drag up → grow
  toolsHeight.value = Math.max(0, startHeight + dy);
}

function stopDrag() {
  dragging.value = false;
  if (toolsHeight.value < 40) toolsHeight.value = 0;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
}
function toggleTools() {
  if (toolsHeight.value > 0) {
    toolsHeight.value = 0;
  } else {
    toolsHeight.value = DEFAULT_TOOLS_HEIGHT;
  }
}
</script>
