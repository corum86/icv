import { cvData } from '@/data/cvData'
import { places } from '@/data/places'
import type { CVContent, PlaceMarker } from '@/types/cv'

export interface CvContentService {
  getCvContent: () => Promise<CVContent>
  getPlaceMarkers: () => Promise<PlaceMarker[]>
}

// Backend service - fetches from MongoDB via FastAPI
export const backendCvContentService: CvContentService = {
  async getCvContent() {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const response = await fetch(`${backendUrl}/api/cv`)
      
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`)
      }
      
      const data = await response.json()
      return data as CVContent
    } catch (error) {
      console.warn('Failed to fetch CV data from backend, using local data:', error)
      // Fallback to local data if backend is unavailable
      return cvData
    }
  },
  async getPlaceMarkers() {
    return places
  },
}

// Static service - uses local data (useful for development/testing)
export const staticCvContentService: CvContentService = {
  async getCvContent() {
    return cvData
  },
  async getPlaceMarkers() {
    return places
  },
}

// Export the default service (backend with fallback)
export default backendCvContentService
