<template>
  <SectionContainer id="contact" :title="t('sections.contact')">
    <div class="grid-two">
      <article class="card">
        <p>{{ t('labels.email') }}: <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
        <p v-if="contact.phone">{{ t('labels.phone') }}: <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></p>
        <p>{{ t('labels.address') }}: {{ contact.location }}</p>
      </article>
      <article class="card">
        <p v-if="contact.website">
          {{ t('labels.website') }}:
          <a :href="contact.website" target="_blank" rel="noreferrer">{{ contact.website }}</a>
        </p>
        <ul>
          <li v-for="link in contact.links" :key="link.href">
            <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
          </li>
        </ul>
      </article>
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import type { ContactContent } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  contact: ContactContent
}>()
</script>
