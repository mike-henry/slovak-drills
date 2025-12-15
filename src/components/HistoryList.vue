<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold mb-2">History</h2>

    <ul class="history-list">
      <li v-for="(item, index) in history" :key="index">
        <span v-if="item.correct" class="text-emerald-500">✓</span>
        <span v-else class="text-rose-500">✗</span>
        {{ item.word }} → {{ item.answer }} : {{ item.expected }}
        <span v-if="!item.correct" class="text-emerald-500" @click="openHelp(item.documentation)">🔍</span>
        <case-Help  v-if="isCaseHelpShow(item.documentation,item)" :case-name=item.caseName :section=item.documentation
          @confirm="closeHelp()" />

      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps,ref } from 'vue'
import CaseHelp from './CaseHelp.vue'

const { history } = defineProps({
  history: {
    type: Array,
    required: true
  }
})

const presentSection = ref()

function closeHelp(){
  presentSection.value = undefined
}

function isCaseHelpShow(section,item){
    return presentSection.value === section
}

function openHelp(section){
  presentSection.value =section
}
</script>

