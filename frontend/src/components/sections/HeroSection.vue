<template>
  <SectionContainer id="hero" :title="t('sections.hero')" plain>
    <RevealOnScroll>
      <p class="hero-kicker">{{ profileTitle || hero.role }}</p>
      <h1 class="hero-name">{{ profileName || hero.name }}</h1>
      <p class="hero-tagline">{{ hero.tagline }}</p>
      <p class="hero-summary">{{ hero.summary }}</p>
      <div class="hero-actions">
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
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { HeroContent } from '@/types/cv'

const { t } = useI18n()

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

<style scoped>
.hero-kicker {
  margin: 0 0 8px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-alt);
}

.hero-name {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  line-height: 1.05;
  color: var(--color-text);
}

.hero-tagline {
  margin: 0 0 24px;
  max-width: 640px;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--color-text-muted);
}

.hero-summary {
  margin: 0 0 32px;
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
}

.hero-actions {
  display: flex;
  gap: 24px;
}
</style>
