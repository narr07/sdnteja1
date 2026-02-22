import Link from 'next/link'
import Image from 'next/image'
import { activities } from '@/lib/data'
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Detail Kegiatan - SDN Teja 1',
}

export async function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }))
}

export default function KegiatanDetailPage({ params }: { params: { slug: string } }) {
  const activity = activities.find(a => a.slug === params.slug)

  if (!activity) {
    notFound()
  }

  const relatedActivities = activities.filter(a => a.id !== activity.id).slice(0, 3)

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <Link href="/kegiatan" className="hover:underline font-black">Kegiatan</Link>
            <ChevronRight size={16} />
            <span className="font-black line-clamp-1">{activity.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Date */}
          <div className="flex items-center gap-2 mb-6 border-b-4 border-foreground pb-6">
            <Calendar size={20} />
            <p className="text-lg font-black">
              {new Date(activity.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-8 leading-tight">
            {activity.title}
          </h1>

          {/* Divider */}
          <div className="h-2 bg-primary mb-8"></div>

          {/* Content */}
          <div className="mb-8 aspect-video relative overflow-hidden border-4 border-foreground bg-accent">
            <Image
              src={activity.photo}
              alt={activity.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed font-bold whitespace-pre-wrap">
              {activity.fullContent}
            </p>
          </div>

          {/* Back Button */}
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-black border-2 border-foreground hover:scale-105 active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
            Kembali ke Kegiatan
          </Link>
        </div>
      </div>

      {/* Related Activities */}
      {relatedActivities.length > 0 && (
        <div className="border-b-4 border-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Kegiatan Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedActivities.map((related) => (
                <Link
                  key={related.id}
                  href={`/kegiatan/${related.slug}`}
                  className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors group block"
                >
                  <p className="text-sm font-black text-foreground group-hover:text-primary-foreground mb-3">
                    {new Date(related.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-lg font-black mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm font-bold line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
