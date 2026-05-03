import { cvData } from '@/data/cvData'
import { places } from '@/data/places'
import type { CVContent, PlaceMarker } from '@/types/cv'

export interface CvContentService {
  getCvContent: () => Promise<CVContent>
  getPlaceMarkers: () => Promise<PlaceMarker[]>
}

export const staticCvContentService: CvContentService = {
  async getCvContent() {
    return cvData
  },
  async getPlaceMarkers() {
    return places
  },
}
