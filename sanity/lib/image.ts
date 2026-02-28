// sanity/lib/image.ts
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/lib/api'

// Pastikan projectId & dataset terisi string yang benar
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}