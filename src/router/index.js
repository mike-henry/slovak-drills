import { createRouter, createWebHistory } from 'vue-router'

// Import your test components
import NounGenderDrill from '../components/NounGenderDrill.vue'

import NounCaseDrill from '../components/NounCaseDrill.vue'
import AdjectiveCaseDrill from '../components/AdjectiveCaseDrill.vue'
import NounAdjectiveCaseDrill from '@/components/NounAdjectiveCaseDrill.vue'
import PropositionNounAdjectiveCaseDrill from '@/components/PropositionNounAdjectiveCaseDrill.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: NounGenderDrill,
  },
  {
    path: '/noun-gender',
    name: 'gender',
    component: NounGenderDrill,
  },
  {
    path: '/noun-accusative-case',
    name: 'accusative-noun',
    component: NounCaseDrill,
    props: { caseName: 'accusative' } 
  },
  {
    path: '/adjective-noun-accusative-case',
    name: 'accusative-adjective-noun',
    component: NounAdjectiveCaseDrill,
    props: { caseName: 'accusative' } 
  },  
  {
    path: '/adjective-accusative-case',
    name: 'accusative-adjective',
    component: AdjectiveCaseDrill,
    props: { caseName: 'accusative' } 
  },  
  {
    path: '/noun-instrumental-case',
    name: 'instrumental',
    component: NounCaseDrill,
    props: { caseName: 'instrumental' } 
  },
   {
    path: '/adjective-instrumental-case',
    name: 'instrumental-adjective',
    component: AdjectiveCaseDrill,
    props: { caseName: 'instrumental' } 
  },
  {
    path: '/adjective-noun-instrumental-case',
    name: 'instrumental-adjective-noun',
    component: NounAdjectiveCaseDrill,
    props: { caseName: 'instrumental' } 
  },  
  {
    path: '/noun-localative-case',
    name: 'localive',
    component: NounCaseDrill,
    props: { caseName: 'locative' } 
  },
   {
    path: '/adjective-localative-case',
    name: 'localive-adjective',
    component: AdjectiveCaseDrill,
    props: { caseName: 'locative' } 
  },
  {
    path: '/adjective-noun-localative-case',
    name: 'localative-adjective-noun',
    component: NounAdjectiveCaseDrill,
    props: { caseName: 'locative' } 
  },
  {
   path: '/proposition-adjective-noun',
   name: 'proposition-adjective-noun',
   component: PropositionNounAdjectiveCaseDrill
  } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
