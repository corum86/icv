<template>
  <SectionContainer id="contact" title="Kontakt">
    <div class="grid-two">
      <article class="card">
        <p>E-Mail: <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
        <p v-if="contact.phone">Telefon: <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></p>
        <p>Adresse: {{ contact.location }}</p>
      </article>
      <article class="card">
        <p v-if="contact.website">
          Website: <a :href="contact.website" target="_blank" rel="noreferrer">{{ contact.website }}</a>
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
import SectionContainer from '@/components/layout/SectionContainer.vue'
import type { ContactContent } from '@/types/cv'

defineProps<{
  contact: ContactContent
}>()
</script>
