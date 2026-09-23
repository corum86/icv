<template>
  <header id="hero" class="profile">
    <h1 class="profile-name">{{ hero.name || profileName }}</h1>
    <p class="profile-role">{{ hero.role || profileTitle }}</p>

    <ul v-if="facts.length" class="profile-facts">
      <li v-for="fact in facts" :key="fact">{{ fact }}</li>
    </ul>

    <ul class="profile-contact">
      <li>
        <a class="icon-button" :href="`mailto:${contact.email}`">
          <AppIcon name="mail" />{{ contact.email }}
        </a>
      </li>
      <li v-if="contact.phone">
        <a class="icon-button" :href="`tel:${contact.phone.replace(/\s/g, '')}`">
          <AppIcon name="phone" />{{ contact.phone }}
        </a>
      </li>
      <li v-for="link in contact.links" :key="link.href">
        <a class="icon-button" :href="link.href" target="_blank" rel="noreferrer">
          <AppIcon :name="linkIcon(link.label)" />{{ link.label }}
        </a>
      </li>
      <li v-if="contact.website">
        <a class="icon-button" :href="contact.website" target="_blank" rel="noreferrer">
          <AppIcon name="globe" />{{ displayHost(contact.website) }}
        </a>
      </li>
      <li class="no-print">
        <button class="icon-button" type="button" @click="printPage">
          <AppIcon name="print" />{{ t('actions.print') }}
        </button>
      </li>
    </ul>

    <p class="profile-summary">{{ hero.summary }}</p>

    <dl class="profile-details">
      <div v-if="hero.keySkills?.length" class="profile-detail">
        <dt>{{ t('sections.keySkills') }}</dt>
        <dd>
          <ul class="chip-list">
            <li v-for="skill in hero.keySkills" :key="skill" class="chip chip--accent">
              {{ skill }}
            </li>
          </ul>
        </dd>
      </div>
      <div v-if="languages?.length" class="profile-detail">
        <dt>{{ t('sections.languages') }}</dt>
        <dd>
          <ul class="language-list">
            <li v-for="entry in languages" :key="entry.language">
              {{ entry.language }} <span class="language-level">{{ entry.level }}</span>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon, { type IconName } from '@/components/ui/AppIcon.vue'
import type { ContactContent, ExperienceItem, HeroContent, LanguageSkill } from '@/types/cv'
import { yearsSince } from '@/utils/formatDate'

const { t } = useI18n()

const props = defineProps<{
  hero: HeroContent
  contact: ContactContent
  languages?: LanguageSkill[]
  currentPosition?: ExperienceItem
  profileName?: string
  profileTitle?: string
}>()

const facts = computed(() => {
  const list: string[] = []
  if (props.hero.location) {
    list.push(props.hero.location)
  }

  const years = props.hero.careerStart ? yearsSince(props.hero.careerStart) : undefined
  if (years) {
    list.push(t('labels.yearsExperience', { n: years }))
  }

  if (props.currentPosition) {
    list.push(t('labels.currentlyAt', { company: props.currentPosition.company }))
  }
  return list
})

const linkIcon = (label: string): IconName => {
  const key = label.toLowerCase()
  if (key.includes('github')) {
    return 'github'
  }
  if (key.includes('linkedin')) {
    return 'linkedin'
  }
  return 'external'
}

const displayHost = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const printPage = () => window.print()
</script>

<style scoped>
.profile {
  padding: 56px 0 40px;
}

.profile-name {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.profile-role {
  margin: 4px 0 0;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: var(--color-text-muted);
}

.profile-facts {
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.925rem;
  color: var(--color-text-subtle);
}

.profile-facts li:not(:last-child)::after {
  content: '·';
  margin: 0 10px;
}

.profile-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.profile-contact a:hover {
  text-decoration: none;
}

.profile-summary {
  max-width: 68ch;
  margin: 24px 0 0;
  color: var(--color-text-muted);
}

.profile-details {
  display: grid;
  gap: 14px;
  margin: 24px 0 0;
}

.profile-detail {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 4px 24px;
  align-items: baseline;
}

.profile-detail dt {
  font-size: 0.875rem;
  font-weight: 600;
}

.profile-detail dd {
  margin: 0;
}

.language-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.language-level {
  color: var(--color-text-subtle);
  font-size: 0.875rem;
}

@media (max-width: 720px) {
  .profile {
    padding-top: 32px;
  }

  .profile-detail {
    grid-template-columns: 1fr;
  }

  .profile-contact .icon-button {
    font-size: 0.8rem;
    padding: 5px 8px;
  }
}

@media print {
  .profile {
    padding-top: 0;
  }

  .profile-contact .icon-button {
    border: 0;
    padding: 0 8px 0 0;
  }
}
</style>
