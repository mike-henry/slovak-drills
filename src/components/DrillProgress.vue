<template>
  <div class="drill-progress-wrapper">
    <!-- Progress bar -->
    <div class="progress">
       <i :style="{ width: progressPercent + '%' }"></i>
    </div>

    <!-- Streak + Total -->
    <div class="mt-4 flex gap-4">
      <div>Streak: {{ streakCount }}</div>
      <div>Total: {{  totalAttempts }}</div>
    </div>
  </div>
</template>

<script setup>

import { computed  } from 'vue'
import { STREAK_TARGET, streakCount, totalAttempts} from './drillUtils'


const progressPercent = computed(() =>
  Math.min(100, (streakCount.value / STREAK_TARGET) * 100)
)

</script>

<style scoped>
/* Reuse your existing progress bar styles */
.progress {
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.progress i {
  display: block;
  height: 100%;
  background-color: var(--color-primary, #10b981); /* green */
  transition: width 0.25s ease;
}
</style>
