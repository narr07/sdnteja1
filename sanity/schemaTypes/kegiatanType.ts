import {defineType, defineField} from 'sanity'

export const kegiatanType = defineType({
  name: 'kegiatan',
  title: 'Kegiatan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul kegiatan',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'date',
      title: 'Tanggal kegiatan',
      type: 'date', // pakai 'datetime' kalau perlu jam
    }),
    defineField({
      name: 'images',
      title: 'Foto kegiatan',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      options: {
        layout: 'grid', // biar tampil grid, enak untuk banyak foto
      },
    }),
  ],
})