import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Konten Website')
    .items([
      // 1. Singleton Data Sekolah (hanya satu dokumen)
      S.listItem()
        .title('Data Sekolah')
        .child(
          S.document()
            .schemaType('dataSekolah')
            .documentId('dataSekolah') // Menggunakan _id tetap 'dataSekolah'
        ),

      S.divider(), // Pembatas

      // 2. Daftar untuk dokumen-dokumen yang berupa array/list (bisa banyak)
      S.documentTypeListItem('berita').title('Berita'),
      S.documentTypeListItem('kegiatan').title('Kegiatan'),
      S.documentTypeListItem('artikel').title('Artikel'),
      S.documentTypeListItem('guru').title('Data Guru'),

      S.divider(),

      // 3. Tampilkan sisanya secara dinamis (kecuali yang sudah kita atur manual di atas)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['dataSekolah', 'berita', 'kegiatan', 'artikel', 'guru'].includes(item.getId()!),
      ),
    ])
