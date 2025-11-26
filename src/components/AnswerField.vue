<template>
  <div class="answer-field">
    <input
      ref="inputEl"
      v-model="model"
      type="text"
      class="drill-input"
      :disabled="disabled"
    />

    <div class="mt-2">
      <button
        v-for="char in specialChars"
        :key="char"
        @click="insertChar(char)"
        class="drill-char-button"
        style="margin: 0.1rem;"
      >
        {{ char }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { nextTick } from "vue";
import { computed,defineProps } from "vue"


const specialChars = [
  'á', 'ä', 'č', 'ď', 'é', 'í', 'ĺ', 'ľ', 'ň',
  'ó', 'ô', 'ŕ', 'š', 'ť', 'ú', 'ý', 'ž'
]

// v-model support
const props = defineProps({
  modelValue: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(["update:modelValue"])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
})

const inputEl = ref(null)

const insertChar = (char) => {
  insertAtCursor(model, inputEl, char)
}




/**
 * Inserts a character into a text input at the cursor position,
 * updating both the input element and the v-model ref.
 *
 * @param {Ref<string>} modelRef - the v-model string (e.g., userAnswer)
 * @param {Ref<HTMLElement|null>} inputRef - a ref to the <input> element
 * @param {string} char - the character to insert
 */
function insertAtCursor(modelRef, inputRef, char) {
  const el = inputRef.value;
  if (!el) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;

  modelRef.value =
    modelRef.value.slice(0, start) + char + modelRef.value.slice(end);

  // Restore focus + cursor position
  nextTick(() => {
    el.focus();
    const newPos = start + char.length;
    el.setSelectionRange(newPos, newPos);
  });
}


</script>
