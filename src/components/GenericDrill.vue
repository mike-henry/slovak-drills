<template>
    <div class="drill-container">
        <h1 class="title">{{ drillTitle }} </h1>
        <p class="subtitle">{{ drillSubtitle }}</p>

        <div v-if="!hasStarted" class="text-center mt-8">
            <button @click="startQuiz" class="drill-button-primary">
                Start / Reset
            </button>
        </div>

        <div v-else>

            <div class="drill-panel">

                <div class="text-4xl font-bold mb-1">
                   <span>{{ getQuestion }}</span> 
                    <span class="drill-plural" v-if="plural"> in plural</span>
                </div>

                <div class="prompt-subtext">
                    {{ enText }}
                </div>

                <answer-field v-model="userAnswer" :disabled="showExplanation" />

                <div class="mt-4 flex gap-3">
                    <button v-if="!showExplanation" @click="submitAnswer" class="drill-button-primary">
                        Submit
                    </button>

                    <div v-else>
                        <button @click="handleContinue" class="drill-button-secondary">
                            Continue
                        </button>
                        <button @click="openDocumentation" class="drill-button-secondary">
                            Explanation
                        </button>
                    </div>
                </div>

                <div v-if="showExplanation" class="explanation-box">
                    <p class="text-lg">{{ explanationText }}</p>
                </div>

                <drill-progress />

            </div>

          <congrats-modal v-model="showStreakDialog" title="Streak Level Accomplished!" @confirm="resetStreak">
        
           <p>  You reached a streak of {{ streakCount }}!</p>
          <p>You should now try another drill</p>
      </congrats-modal>

            <case-Help ref="caseHelp" v-if="caseHelpShow" :case-name="caseName()" :sections="caseHelpSections"
                @confirm="caseHelpShow = false" />

            <div class="mt-6">
                <history-list :history="history" />
            </div>

        </div>

    </div>
</template>


<script setup lang="ts">

import CongratsModal from './CongratsModal.vue';
import type { CASE_TYPE } from '@/utils/grammer/WordTypes';
import AnswerField from './AnswerField.vue';
import CaseHelp from './CaseHelp.vue';
import DrillProgress from './DrillProgress.vue';
import { computed } from 'vue'
import HistoryList from '@/components/HistoryList.vue'
import { history, resetStreak, streakCount, useDrill } from '@/views/drillUtils';
import { loadVocabulary } from '@/utils/grammer/wordStore';
import { onMounted } from 'vue';
import type DerivedWord from '@/utils/grammer/DerivedWord';

onMounted(() =>  loadVocabulary() )



interface DrillProps<T> {
    caseName: () => CASE_TYPE
    drillTitle: string
    drillSubtitle: string

    sk: (item: T) => string
    en: (item: T) => string
    isPlural: (item: T) => boolean
    buildNextItem: () => T
    expectedAnswer: (item: T) => DerivedWord
    question?:(item:T)=> string
}

type DrillItem = unknown 
const { caseName, drillTitle, drillSubtitle, sk, en, isPlural, buildNextItem, expectedAnswer ,question} = defineProps<DrillProps<DrillItem>>()





const getQuestion = computed(() => {
   if(!currentItem.value) return ''; 
   if(question) return question(currentItem.value)
   else return sk(currentItem.value)
})




const {
    caseTitle,
    hasStarted,
    currentItem,
    userAnswer,
    showExplanation,
    explanationText,
    showStreakDialog,
    caseHelpSections,
    caseHelpShow,
    startQuiz,
    submitAnswer,
    handleContinue,
    openDocumentation
} = useDrill({
    caseName: caseName,
    getNextItem: buildNextItem,
    getExpected: expectedAnswer,
    getInitialAnswer: sk,   //TODO replace with sk
    getWordForHistory: sk   //TODO replace with sk
})


const skText = computed(() =>
    currentItem.value ? sk(currentItem.value) : ''
)

const enText = computed(() =>
    currentItem.value ? en(currentItem.value) : ''
)

const plural = computed(() =>
    currentItem.value ? isPlural(currentItem.value) : false
)




</script>