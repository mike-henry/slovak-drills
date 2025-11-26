<template>
    <div class="congrats" v-if="showCongrats">
    <h2>🎉 Congrats!</h2>
    <div id="congratsMsg">You got {{ STREAK_TARGET }} correct in a row.</div>
    <button class="reset" @click="resetQuiz">Keep playing</button>
   </div>
</template>

<script setup>
import { STREAK_TARGET } from './drillUtils';





</script>

