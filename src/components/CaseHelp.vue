<template>
    <transition name="fade">
        <div class="help-overlay">
            <div class="help-panel drill-container">
                <!-- BOTTOM BUTTON BAR -->
                  <h2 class="  drill-title">Rules for the {{ caseName }} case</h2>
                <div class="content-scroll">
                    <!-- STEM SECTION (top pane) -->
                    <h2  class="  drill-title">Stem Rules:</h2>
                    <div class=" drill-container" v-html="stemHtml"></div>
                    <h2  class="  drill-title" >Ending Rules: </h2>
                    <div v-for="item in sectionHtml" class="drill-container " v-html="item"></div>
                </div>
                <div class="drill-container ">
                    <button class=" drill-button-primary" @click="close">Close</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts" >
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { loadMarkdown } from '@/documents/DocumentLoader'

const props = defineProps({
  caseName: {
    type: String,
    required: true
  },
  section: {
    type: Array as () => string[],
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const stemHtml = ref('')
const sectionHtml = ref([])

onMounted(async () => {
    const md = await loadMarkdown(props.caseName)
    const html = await marked.parse(md || `No content found for ${props.caseName}`)

    stemHtml.value = extractSectionById(html, 'stems')
    sectionHtml.value = extractSectionsByIds(html, props.section)
})



function extractSectionsByIds(htmlString:string, ids:string[]):string[] {
       return ids.map(id =>extractSectionById(htmlString, id) )
}


function extractSectionById(htmlString:string, id) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')
    const el = doc.getElementById(id)
    return el ? el.outerHTML : `<p>No content found for ${id}</p>`
}

function close() {
    emit('confirm')
    emit('update:modelValue', false)
}
</script>

<style scoped>
.help-overlay {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
}

.content-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.help-panel {
    width: 85%;
    height: 80vh;
  
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
}

.split-container {
    flex: 1;
}

.pane-header {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    background: #f5f5f5;
}

.pane-content {
    padding: 16px;
    overflow-y: auto;
    height: 100%;
}

.close-btn {
    padding: 10px 20px;
    background-color: #4f46e5;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.close-btn:hover {
    background-color: #4338ca;
}


.pane-content table {
    width: 100%;
    /* full width of container */
    max-width: 100%;
    /* prevent overflow */
    border-collapse: collapse;
    table-layout: fixed;
    /* evenly sized columns */
    font-size: 0.85rem;
    /* smaller font for tables */
}

.split-container {
    flex: 1;
    min-height: 0;
    /* ← REQUIRED FOR FLEX + SPLITPANES */
}
</style>
