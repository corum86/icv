<template>
  <main class="cv-container">
    <h1>My Interactive CV</h1>
    
    <div v-if="loading">Waking up the server...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="profile" class="profile-card">
      <h2>{{ profile.name }}</h2>
      <h3>{{ profile.title }}</h3>
      <p>Data successfully fetched from MongoDB via FastAPI!</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const profile = ref(null)
const loading = ref(true)
const error = ref(null)
const apiUrl = 'https://icv-9zu5.onrender.com/' // Update this URL when deploying

onMounted(async () => {
  try {
    // Swap this with your Render URL when deploying!
    const profileEndpoint = `${apiUrl}api/profile`
    
    const response = await fetch(profileEndpoint)
    if (!response.ok) throw new Error('Failed to fetch data')
    
    profile.value = await response.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.cv-container {
  font-family: sans-serif;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
.profile-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  background-color: #f9f9f9;
}
.error {
  color: red;
}
</style>