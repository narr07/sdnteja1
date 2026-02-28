import { Building2, Calendar, Award } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { DATA_SEKOLAH_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Data Sekolah - SDN Teja 1',
  description: 'Informasi lengkap tentang SDN Teja 1'
}

export default async function DataSekolahPage() {
  const { data } = await sanityFetch({ query: DATA_SEKOLAH_QUERY })

  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border-4 border-foreground p-8 bg-primary text-primary-foreground">
            <div className="flex items-start gap-4 mb-4">
              <Calendar size={32} className="shrink-0" />
              <div>
                <p className="text-sm font-black mb-1">Tahun Berdiri</p>
                <p className="text-4xl font-black">{data?.tahunBerdiri || '-'}</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-accent text-accent-foreground">
            <div className="flex items-start gap-4 mb-4">
              <Building2 size={32} className="shrink-0" />
              <div>
                <p className="text-sm font-black mb-1">Total Siswa</p>
                <p className="text-4xl font-black">{data?.totalSiswa || '-'}</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-background">
            <div className="flex items-start gap-4 mb-4">
              <Award size={32} className="shrink-0" />
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Akreditasi</p>
                <p className="text-4xl font-black">{data?.akreditasi || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="border-4 border-foreground p-8 mb-12 bg-background">
          <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Fasilitas Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.fasilitas && data.fasilitas.length > 0 ? (
              data.fasilitas.map((facility: string | null, idx: number) => (
                <div key={idx} className="border-4 border-foreground p-6 flex items-center gap-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-black">
                    ✓
                  </div>
                  <span className="font-bold text-base">{facility}</span>
                </div>
              ))
            ) : (
              <p className="col-span-1 md:col-span-3 font-bold">Fasilitas belum ditambahkan.</p>
            )}
          </div>
        </div>

        {/* Contact & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-foreground pb-4">Kontak</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Telepon</p>
                <p className="text-lg font-black">{data?.telepon || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Email</p>
                <p className="text-lg font-black">{data?.email || '-'}</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-foreground pb-4">Lokasi</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Alamat</p>
                <p className="text-lg font-black leading-relaxed whitespace-pre-line">
                  {data?.alamat || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
