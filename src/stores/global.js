import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18next from 'i18next'
import { DEFAULT_LANGUAGE } from '@/constants'

export const useGlobalStore = defineStore('global', () => {
  const currentLanguage = ref(i18next.language || DEFAULT_LANGUAGE)

  function setLanguage(lang) {
    currentLanguage.value = lang
    i18next.changeLanguage(lang)
  }

  i18next.on('languageChanged', (lang) => {
    currentLanguage.value = lang
  })

  return {
    currentLanguage,
    setLanguage
  }
})
