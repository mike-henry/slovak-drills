<template>
  <div>
    <h2 class="font-semibold mb-2">Noun Filter</h2>
    <span class="text-sm opacity-80 mb-4 block"> Select which noun labels to filter out from drills. </span>

    <label v-for="label in availableLabels" :key="label" class="flex items-center gap-2">
      <input type="checkbox" :checked="activeLabels.includes(label)" @change="toggleLabel(label)" />
      <span class="capitalize">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { bus } from '@/events/bus';
import Noun from '@/utils/grammer/declinations/Noun';
import { LocalStoragePersistance } from '@/utils/grammer/persistance/LocalStoragePersistance';
import { readPersistentState } from '@/utils/grammer/persistance/StateReader';
import { ref, type Ref } from 'vue';

const activeFilterPersitance = new LocalStoragePersistance<string[]>();
const activeLabels: Ref<string[]> = ref(
  readPersistentState({
    key: 'filteredNounLabels',
    persistance: activeFilterPersitance,
    create: () => [],
  }),
);
// Filtered labels are persisted

function toggleLabel(label: string) {
  if (activeLabels.value.includes(label)) {
    remove(label);
  } else {
    add(label);
  }
  bus.emit('noun-active-labels-updated', activeLabels.value);
}

/// this is all temporary to force refresh of available labels

const availableLabels = ref<string[]>([]);

bus.on('noun-all-labels-updated', () => {
  refresh();
});

function add(label: string) {
  activeLabels.value.unshift(label);
}

function remove(label: string) {
  const i = activeLabels.value.indexOf(label);
  if (i !== -1) {
    activeLabels.value.splice(i, 1);
  }
}

function refresh() {
  availableLabels.value = Noun.getLabels();
}
</script>
<address></address>
