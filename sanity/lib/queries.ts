// sanity/lib/queries.ts

import {defineQuery} from 'next-sanity'

// ============================================================
// ARTIKEL
// ============================================================

export const ARTIKEL_LIST_QUERY = defineQuery(`*[
  _type == "artikel"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  judul,
  slug,
  publishedAt,
  "guruNama": guru->nama,
  gambar{
    ...,
    alt
  }
}`)

export const ARTIKEL_DETAIL_QUERY = defineQuery(`*[
  _type == "artikel"
  && slug.current == $slug
][0]{
  _id,
  judul,
  slug,
  publishedAt,
  "guruNama": guru->nama,
  gambar{
    ...,
    alt
  },
  isi
}`)

// ============================================================
// BERITA
// ============================================================

export const BERITA_LIST_QUERY = defineQuery(`*[
  _type == "berita"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  judul,
  slug,
  publishedAt
}`)

export const BERITA_DETAIL_QUERY = defineQuery(`*[
  _type == "berita"
  && slug.current == $slug
][0]{
  _id,
  judul,
  slug,
  publishedAt,
  isi
}`)

// ============================================================
// GURU
// ============================================================

export const GURU_LIST_QUERY = defineQuery(`*[
  _type == "guru"
  && defined(slug.current)
]|order(nama asc){
  _id,
  nama,
  slug,
  jabatan,
  foto,
  bio
}`)

export const GURU_DETAIL_QUERY = defineQuery(`*[
  _type == "guru"
  && slug.current == $slug
][0]{
  _id,
  nama,
  slug,
  jabatan,
  foto,
  bio
}`)

// ============================================================
// KEGIATAN
// ============================================================

export const KEGIATAN_LIST_QUERY = defineQuery(`*[
  _type == "kegiatan"
]|order(date desc){
  _id,
  title,
  date,
  images[]{
    ...,
    alt
  }
}`)

export const KEGIATAN_DETAIL_QUERY = defineQuery(`*[
  _type == "kegiatan"
  && _id == $id
][0]{
  _id,
  title,
  date,
  images[]{
    ...,
    alt
  }
}`)

// ============================================================
// DATA SEKOLAH — Query lengkap (semua grup)
// ============================================================

export const DATA_SEKOLAH_QUERY = defineQuery(`*[
  _type == "dataSekolah"
][0]{
  _id,
  visi,
  misi,
  tujuan,
  prestasi[]{
    judul,
    tahun,
    namaSiswa
  },
  fasilitas,
  tahunBerdiri,
  akreditasi,
  totalSiswa,
  jumlahSiswa,
  alamat,
  telepon,
  email,
  sosmed{
    instagram,
    youtube,
    tiktok
  }
}`)

// ============================================================
// DATA SEKOLAH — Per grup
// ============================================================

// Grup: Profil (visi, misi, tujuan, prestasi, fasilitas)
export const SEKOLAH_PROFIL_QUERY = defineQuery(`*[
  _type == "dataSekolah"
][0]{
  _id,
  visi,
  misi,
  tujuan,
  prestasi[]{
    judul,
    tahun,
    namaSiswa
  },
  fasilitas
}`)

// Grup: Statistik (akreditasi, totalSiswa, jumlahSiswa)
export const SEKOLAH_STATISTIK_QUERY = defineQuery(`*[
  _type == "dataSekolah"
][0]{
  _id,
  tahunBerdiri,
  akreditasi,
  totalSiswa,
  jumlahSiswa
}`)

// Grup: Kontak (alamat, telepon, email)
export const SEKOLAH_KONTAK_QUERY = defineQuery(`*[
  _type == "dataSekolah"
][0]{
  _id,
  alamat,
  telepon,
  email
}`)

// Grup: Sosial Media
export const SEKOLAH_SOSMED_QUERY = defineQuery(`*[
  _type == "dataSekolah"
][0]{
  _id,
  sosmed{
    instagram,
    youtube,
    tiktok
  }
}`)