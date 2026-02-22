import { schoolData } from '@/lib/data'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Visi Misi - SDN Teja 1',
  description: 'Visi dan Misi SDN Teja 1'
}

export default function VisiMisiPage() {
  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visi */}
          <div className="border-4 border-foreground p-8 h-fit bg-primary text-primary-foreground">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <CheckCircle size={32} />
              VISI
            </h2>
            <p className="text-lg leading-relaxed font-bold">
              {schoolData.visi}
            </p>
          </div>

          {/* Misi */}
          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <CheckCircle size={32} />
              MISI
            </h2>
            <ul className="space-y-4">
              {schoolData.misi.map((misi, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-black flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="font-bold text-base leading-relaxed">
                    {misi}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 border-4 border-foreground p-8 bg-background">
          <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Nilai-Nilai Inti Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Integritas', desc: 'Jujur dan bertanggung jawab' },
              { title: 'Inovasi', desc: 'Selalu mencari cara baru lebih baik' },
              { title: 'Inklusi', desc: 'Menghargai keberagaman' },
              { title: 'Inspirasi', desc: 'Memberdayakan semua siswa' }
            ].map((value) => (
              <div key={value.title} className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <h3 className="text-xl font-black mb-2">{value.title}</h3>
                <p className="text-sm font-bold">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
