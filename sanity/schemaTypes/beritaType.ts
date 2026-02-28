import {DocumentTextIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const beritaType = defineType({
  name: 'berita',
  title: 'Berita',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'judul',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'judul',
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'isi',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'judul',
    },
  },
})
