import {defineType, defineField} from 'sanity'

export const dataSekolahType = defineType({
  name: 'dataSekolah',
  title: 'Data Sekolah',
  type: 'document',
  groups: [
    {name: 'profil', title: 'Profil', default: true},
    {name: 'statistik', title: 'Statistik'},
    {name: 'kontak', title: 'Kontak'},
  ],
  fields: [
    defineField({
      name: 'visi',
      title: 'Visi',
      type: 'array',
      of: [{type: 'block'}],
      group: 'profil',
    }),
    defineField({
      name: 'misi',
      title: 'Misi',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{title: 'Numbered', value: 'number'}],
        },
      ],
      group: 'profil',
    }),
    defineField({
      name: 'tujuan',
      title: 'Tujuan',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{title: 'Numbered', value: 'number'}],
        },
      ],
      group: 'profil',
    }),
    defineField({
      name: 'prestasi',
      title: 'Prestasi Siswa',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'prestasiItem',
          title: 'Prestasi',
          fields: [
            {name: 'judul', title: 'Judul Prestasi', type: 'string'},
            {name: 'tahun', title: 'Tahun', type: 'number'},
            {name: 'namaSiswa', title: 'Nama Siswa', type: 'string'},
          ],
        },
      ],
      group: 'profil',
    }),
    defineField({
      name: 'fasilitas',
      title: 'Fasilitas',
      type: 'array',
      of: [{type: 'string'}],
      group: 'profil',
    }),
    defineField({
      name: 'tahunBerdiri',
      title: 'Tahun Berdiri',
      type: 'number',
      group: 'statistik',
    }),
    defineField({
      name: 'akreditasi',
      title: 'Akreditasi',
      type: 'string',
      group: 'statistik',
    }),
    defineField({
      name: 'totalSiswa',
      title: 'Total Siswa',
      type: 'number',
      group: 'statistik',
    }),
    defineField({
      name: 'alamat',
      title: 'Alamat',
      type: 'string',
      group: 'kontak',
    }),
    defineField({
      name: 'telepon',
      title: 'Telepon',
      type: 'string',
      group: 'kontak',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'kontak',
    }),
    defineField({
      name: 'sosmed',
      title: 'Sosial Media',
      type: 'object',
      group: 'kontak',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
        }),
        defineField({
          name: 'youtube',
          title: 'Youtube',
          type: 'string',
        }),
        defineField({
          name: 'tiktok',
          title: 'Tiktok',
          type: 'string',
        }),
      ],
    })
  ],
})