import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { GURU_LIST_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { GURU_LIST_QUERYResult } from '@/sanity/types'

export const metadata = {
  title: 'Guru - SDN Teja 1',
  description: 'Daftar guru dan staf pengajar SDN Teja 1'
}

export default async function GuruPage() {
  const { data: teachers } = await sanityFetch({ query: GURU_LIST_QUERY })

  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 border-b-4 border-foreground pb-8">
          <p className="text-lg font-black mb-4">
            Tim pendidik kami terdiri dari profesional berpengalaman yang berdedikasi untuk memberikan pendidikan berkualitas tinggi.
          </p>
        </div>

        {/* Teachers Grid */}
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher: NonNullable<GURU_LIST_QUERYResult>[number]) => {
              const asset = teacher.foto?.asset as { metadata?: { lqip?: string } } | undefined;
              const lqip = asset?.metadata?.lqip;

              return (
                <div key={teacher._id} className="border-4 border-foreground p-6 bg-background hover:bg-primary hover:text-primary-foreground transition-colors group">
                  {/* Photo */}
                  <div className="mb-6 aspect-square relative overflow-hidden border-4 border-foreground bg-accent">
                    {teacher.foto ? (
                      <Image
                        src={urlFor(teacher.foto).width(800).height(800).url()}
                        alt={teacher.nama || 'Foto Guru'}
                        fill
                        placeholder={lqip ? "blur" : "empty"}
                        blurDataURL={lqip || undefined}
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-black text-foreground">
                        ?
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-black mb-2">{teacher.nama}</h3>
                  <p className="text-sm font-black mb-4 bg-primary text-primary-foreground group-hover:bg-foreground  group-hover:text-primary transition-colors px-3 py-1 w-fit">
                    {teacher.jabatan || 'Guru'}
                  </p>
                  {teacher.bio && (
                    <p className="text-sm font-bold leading-relaxed line-clamp-3">
                      {teacher.bio}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-4 border-foreground p-8 text-center bg-accent text-accent-foreground font-black text-xl">
            Belum ada data guru yang ditambahkan.
          </div>
        )}

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
