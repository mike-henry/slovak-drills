<template>
  <div
    class="min-h-screen bg-slate-900 text-slate-100 
           dark:bg-slate-100 dark:text-slate-900
           flex flex-col items-center p-6"
  >
    <!-- HEADER -->
    <header class="w-full max-w-4xl mb-6">
       <h1 class="text-xl font-bold">Slovak Drills</h1>
      <div class="flex justify-between items-center">
        <!-- Title -->
       

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex gap-6">
          <!-- One group -->
          <div class="relative group" v-for="group in menu" :key="group.label">
            <button class="hover:underline flex items-center gap-1">
              {{ group.label }}
              <span>▾</span>
            </button>

            <div
              class="absolute left-0 mt-2 bg-slate-800 dark:bg-slate-200
                     border border-slate-700 dark:border-slate-300
                     rounded-md shadow-lg opacity-0 invisible 
                     group-hover:opacity-100 group-hover:visible 
                     transition-all z-50"
            >
              <RouterLink
                v-for="item in group.items"
                :key="item.to"
                :to="item.to"
                class="block px-4 py-2 hover:bg-slate-700 dark:hover:bg-slate-300 whitespace-nowrap"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </div>
        </nav>

        <div class="flex items-center gap-3">
          <!-- Dark/Light toggle -->
          <button
            @click="toggleTheme"
            class="px-2 py-1 rounded hover:bg-slate-700 dark:hover:bg-slate-300"
            title="Toggle dark/light mode"
          >
            <span v-if="isDark">🌞</span>
            <span v-else>🌙</span>
          </button>

          <!-- Mobile Menu Button -->
          <button class="md:hidden" @click="mobileOpen = !mobileOpen">
            ☰
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <transition name="fade">
        <div
          v-if="mobileOpen"
          class="md:hidden mt-4 bg-slate-800 dark:bg-slate-200
                 border border-slate-700 dark:border-slate-300 
                 rounded-md p-4 space-y-4"
        >
          <div v-for="(group, index) in menu" :key="group.label">
            <!-- Group heading -->
            <button
              @click="toggle(index)"
              class="w-full text-left font-semibold flex justify-between items-center"
            >
              {{ group.label }}
              <span :class="{ 'rotate-180': openIndex === index }" class="transition-transform">▾</span>
            </button>

            <!-- Items -->
            <div v-if="openIndex === index" class="mt-2 ml-4 space-y-1">
              <RouterLink
                v-for="item in group.items"
                :key="item.to"
                :to="item.to"
                class="block hover:underline"
                @click="mobileOpen = false"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </header>

    <!-- MAIN CONTENT -->
    <main
      class="w-full max-w-4xl bg-slate-800 dark:bg-slate-200
             rounded-xl shadow-lg p-6"
    >
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

/* ----------------------------------------
   MOBILE NAV STATE
---------------------------------------- */
const mobileOpen = ref(false)
const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}

/* ----------------------------------------
   DARK / LIGHT THEME
---------------------------------------- */
const isDark = ref(false)

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(() => {
  const saved = localStorage.getItem('theme')

  // If nothing saved, default to dark mode (your current design)
  isDark.value = saved ? saved === 'dark' : true

  applyTheme()
})

/* ----------------------------------------
   MENU STRUCTURE
---------------------------------------- */
const menu = [
  {
    label: "Accusative",
    items: [
      { label: "Noun", to: "/noun-accusative-case" },
      { label: "Adjective", to: "/adjective-accusative-case" },
      { label: "Adjective noun", to: "/adjective-noun-accusative-case" },
    ]
  },
  {
    label: "Instrumental",
    items: [
      { label: "Noun", to: "/noun-instrumental-case" },
      { label: "Adjective", to: "/adjective-instrumental-case" },
      { label: "Adjective noun", to: "/adjective-noun-instrumental-case" }
    ]
  },
  {
    label: "Locative",
    items: [
      { label: "Noun", to: "/noun-localative-case" },
      { label: "Adjective", to: "/adjective-localative-case" },
      { label: "Adjective noun", to: "/adjective-noun-localative-case" }
    ]
  },
  {
    label: "Other Drills",
    items: [
      { label: "Noun Gender", to: "/noun-gender" },
      { label: "Verb Conjugation", to: "/present-tense-verb" },
      { label: "Verb Conjugation + subject", to: "/present-tense-verb-subject" },
      { label: "Preposition + Adjective + Noun", to: "/proposition-adjective-noun" }
      
    ]
  }
]
</script>

<style>
/* Fade transition for mobile menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
