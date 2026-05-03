import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { Profile } from '@/types/profile'

const API_URL = 'https://icv-9zu5.onrender.com/'
const FIRST_GIF_DURATION_MS = 2500

export function useProfileBootstrap() {
  const profile = ref<Profile | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const firstLoadingGif = '/gifs/loading_1.gif'
  const secondLoadingGif = '/gifs/loading_2.gif'
  const useSecondGif = ref(false)

  let loadingGifTimer: number | null = null

  onMounted(() => {
    loadingGifTimer = window.setTimeout(() => {
      if (loading.value) {
        useSecondGif.value = true
      }
    }, FIRST_GIF_DURATION_MS)
  })

  onBeforeUnmount(() => {
    if (loadingGifTimer !== null) {
      clearTimeout(loadingGifTimer)
    }
  })

  onMounted(async () => {
    try {
      const profileEndpoint = `${API_URL}api/profile`
      const response = await fetch(profileEndpoint)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      profile.value = (await response.json()) as Profile
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Unknown error'
      error.value = message
    } finally {
      loading.value = false
    }
  })

  return {
    profile,
    loading,
    error,
    firstLoadingGif,
    secondLoadingGif,
    useSecondGif,
  }
}
