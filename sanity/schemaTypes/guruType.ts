import {UserIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const guruType = defineType({
  name: 'guru',
  title: 'Guru',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'nama',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'nama',
      },
    }),
    defineField({
      name: 'jabatan',
      type: 'string',
    }),
    defineField({
      name: 'foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'text'
    }),
  ],
  preview: {
    select: {
      title: 'nama',
      media: 'foto',
    },
  },
})
