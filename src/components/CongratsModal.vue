<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-bold mb-3">{{ title }}</h2>

      <div class="text-slate-700 mb-6">
        <slot > </slot>
      </div>

      <div class="flex justify-end gap-3">
        <button class="drill-button-primary" @click="confirm">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String
})

const emit = defineEmits(['update:modelValue', 'confirm'])


const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<style scoped>
/* light styling */
</style>
