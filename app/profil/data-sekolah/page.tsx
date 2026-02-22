import { schoolData } from '@/lib/data'
import { Building2, Calendar, Award } from 'lucide-react'

export const metadata = {
  title: 'Data Sekolah - SDN Teja 1',
  description: 'Informasi lengkap tentang SDN Teja 1'
}

export default function DataSekolahPage() {
  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border-4 border-foreground p-8 bg-primary text-primary-foreground">
            <div className="flex items-start gap-4 mb-4">
              <Calendar size={32} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-black mb-1">Tahun Berdiri</p>
                <p className="text-4xl font-black">{schoolData.founded}</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-accent text-accent-foreground">
            <div className="flex items-start gap-4 mb-4">
              <Building2 size={32} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-black mb-1">Total Siswa</p>
                <p className="text-4xl font-black">{schoolData.stats.students}</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-background">
            <div className="flex items-start gap-4 mb-4">
              <Award size={32} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Akreditasi</p>
                <p className="text-4xl font-black">{schoolData.accreditation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="border-4 border-foreground p-8 mb-12 bg-background">
          <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Fasilitas Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolData.facilities.map((facility, idx) => (
              <div key={idx} className="border-4 border-foreground p-6 flex items-center gap-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-black">
                  ✓
                </div>
                <span className="font-bold text-base">{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-foreground pb-4">Kontak</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Telepon</p>
                <p className="text-lg font-black">(022) 1234-5678</p>
              </div>
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Email</p>
                <p className="text-lg font-black">info@sdnteja1.sch.id</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-foreground pb-4">Lokasi</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-black text-muted-foreground mb-1">Alamat</p>
                <p className="text-lg font-black leading-relaxed">
                  Jalan Pendidikan No. 123<br />
                  Kelurahan Teja, Kota Bandung<br />
                  Jawa Barat, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Structure */}
        <div className="mt-12 border-4 border-foreground p-8 bg-background">
          <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Struktur Organisasi</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-4 border-primary p-4">
              <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center font-black">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <p className="font-black text-sm text-muted-foreground">Kepala Sekolah</p>
                <p className="text-lg font-black">Ibu Siti Nurhaliza, S.Pd</p>
              </div>
            </div>
            <div className="pl-8 border-l-4 border-primary space-y-4">
              <div className="flex items-center gap-4 border-2 border-foreground p-3">
                <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-black">
                  👨
                </div>
                <p className="font-black">Wakil Kepala Kurikulum</p>
              </div>
              <div className="flex items-center gap-4 border-2 border-foreground p-3">
                <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-black">
                  👨
                </div>
                <p className="font-black">Wakil Kepala Kesiswaan</p>
              </div>
              <div className="flex items-center gap-4 border-2 border-foreground p-3">
                <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-black">
                  👨
                </div>
                <p className="font-black">Wakil Kepala Sarana Prasarana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
