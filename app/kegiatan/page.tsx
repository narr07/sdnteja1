import Link from 'next/link'
import Image from 'next/image'
import { activities } from '@/lib/data'
import { ChevronRight, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Kegiatan - SDN Teja 1',
  description: 'Daftar kegiatan sekolah SDN Teja 1'
}

export default function KegiatanPage() {
  return (
    <div className="bg-background border-b-4 border-foreground">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <span className="font-black">Kegiatan</span>
          </div>
          <h1 className="text-5xl font-black">Kegiatan Sekolah</h1>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/kegiatan/${activity.slug}`}
              className="border-4 flex flex-col border-foreground p-6 bg-background hover:bg-primary hover:text-primary-foreground transition-colors group hover:shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {/* Photo */}
              <div className="mb-6 aspect-video relative overflow-hidden border-4 border-foreground bg-accent">
                <Image
                  src={activity.photo}
                  alt={activity.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex items-center gap-2 mb-3 text-muted-foreground group-hover:text-primary-foreground transition-colors">
                <Calendar size={18} className="shrink-0" />
                <p className="text-sm font-black">
                  {new Date(activity.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <h2 className="text-2xl font-black mb-3">
                {activity.title}
              </h2>
              <p className="text-base font-bold leading-relaxed flex-1">
                {activity.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
