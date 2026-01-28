<template>
  <div>
    <h2 class="font-semibold mb-2">Adjective Filter</h2>
    <span class="text-sm opacity-80 mb-4 block"> Select which adjective labels to filter out from drills. </span>

    <label v-for="label in availableLabels" :key="label" class="flex items-center gap-2">
      <input type="checkbox" :checked="activeLabels.includes(label)" @change="toggleLabel(label)" />
      <span class="capitalize">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { bus } from '@/events/bus';
import Adjective from '@/utils/grammer/declinations/Adjective';
import Noun from '@/utils/grammer/declinations/Noun';
import { LocalStoragePersistance } from '@/utils/grammer/persistance/LocalStoragePersistance';
import { readPersistentState } from '@/utils/grammer/persistance/StateReader';
import { ref, type Ref } from 'vue';

const activeFilterPersitance = new LocalStoragePersistance<string[]>();
const activeLabels: Ref<string[]> = ref(
  readPersistentState({
    key: 'filteredAdjectiveLabels',
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
  bus.emit('adjective-active-labels-updated', activeLabels.value);
}

const availableLabels = ref<string[]>([]);

bus.on('adjective-all-labels-updated', () => {
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
  availableLabels.value = Adjective.getLabels();
}
</script>
