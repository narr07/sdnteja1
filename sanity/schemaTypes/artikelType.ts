import {DocumentTextIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const artikelType = defineType({
  name: 'artikel',
  title: 'Artikel',
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
      name: 'guru',
      type: 'reference',
      to: {type: 'guru'},
    }),
    defineField({
      name: 'gambar',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
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
      author: 'guru.nama',
      media: 'gambar',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
