import Image from 'next/image'
import { teachers } from '@/lib/data'

export const metadata = {
  title: 'Guru - SDN Teja 1',
  description: 'Daftar guru dan staf pengajar SDN Teja 1'
}

export default function GuruPage() {
  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 border-b-4 border-foreground pb-8">
          <p className="text-lg font-black mb-4">
            Tim pendidik kami terdiri dari profesional berpengalaman yang berdedikasi untuk memberikan pendidikan berkualitas tinggi.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="border-4 border-foreground p-6 bg-background hover:bg-primary hover:text-primary-foreground transition-colors">
              {/* Photo */}
              <div className="mb-6 aspect-square relative overflow-hidden border-4 border-foreground">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-black mb-2">{teacher.name}</h3>
              <p className="text-sm font-black mb-4 bg-primary text-primary-foreground px-3 py-1 w-fit">
                {teacher.subject}
              </p>
              <p className="text-sm font-bold leading-relaxed line-clamp-3">
                {teacher.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Team Info */}
        <div className="mt-16 border-4 border-foreground p-8 bg-background">
          <h2 className="text-3xl font-black mb-6 border-b-4 border-foreground pb-4">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-black mb-4">Komitmen</h3>
              <p className="font-bold leading-relaxed">
                Setiap guru di SDN Teja 1 berkomitmen untuk menciptakan lingkungan belajar yang positif, inklusif, dan menginspirasi. Kami percaya bahwa setiap siswa memiliki potensi unik yang perlu dikembangkan.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-black mb-4">Pengembangan Profesional</h3>
              <p className="font-bold leading-relaxed">
                Kami secara aktif mengikuti pelatihan dan workshop untuk meningkatkan keterampilan mengajar dan tetap update dengan perkembangan pendidikan terkini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
