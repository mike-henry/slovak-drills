<template>
  <div class="drill-progress-wrapper">
    <!-- Progress bar -->
    <div class="progress">
      <i :style="{ width: progressPercent + '%' }"></i>
    </div>

    <!-- Streak + Total -->
    <div class="mt-4 flex gap-4">
      <div>Streak: {{ streak }} ({{ progressPercent }})%</div>
      <div>Total: {{ attempts }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { STREAK_TARGET } from '../views/drillUtils';
import { globalHistory } from './HistoryEntry';
import { useRoute } from 'vue-router';

const route = useRoute();

const history = computed(() => globalHistory.value.filter((entry) => entry.drillPath === route.fullPath));

const attempts = computed(() => history.value.length);

const streak = computed(() => {
  const position = history.value.findIndex((item) => !item.correct);
  return position === -1 ? history.value.length : position;
});

const progressPercent = computed(() => Math.min(100, (streak.value / STREAK_TARGET) * 100));
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
