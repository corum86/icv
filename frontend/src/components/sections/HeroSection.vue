<template>
  <SectionContainer id="hero" title="Profil">
    <RevealOnScroll>
      <p class="hero-kicker">{{ profileTitle || hero.role }}</p>
      <h1>{{ profileName || hero.name }}</h1>
      <p>{{ hero.tagline }}</p>
      <p>{{ hero.summary }}</p>
      <div>
        <button class="primary-button" type="button" @click="$emit('openMap')">
          {{ hero.primaryCtaLabel }}
        </button>
        <button class="secondary-button" type="button" @click="$emit('jumpToProjects')">
          {{ hero.secondaryCtaLabel }}
        </button>
      </div>
    </RevealOnScroll>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { HeroContent } from '@/types/cv'

defineProps<{
  hero: HeroContent
  profileName?: string
  profileTitle?: string
}>()

defineEmits<{
  openMap: []
  jumpToProjects: []
}>()
</script>
