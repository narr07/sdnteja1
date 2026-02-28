/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { KEGIATAN_DETAIL_QUERY, KEGIATAN_LIST_QUERY } from '@/sanity/lib/queries'
import { defineQuery } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

export const metadata = {
  title: 'Detail Kegiatan - SDN Teja 1',
}

export async function generateStaticParams() {
  const SLUGS_QUERY = defineQuery(`*[_type == "kegiatan" && defined(slug.current)]{"slug": slug.current}`)
  const data = await client.fetch(SLUGS_QUERY)
  return data.map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

export default async function KegiatanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const activityResponse = await sanityFetch({
    query: KEGIATAN_DETAIL_QUERY,
    params: { slug }
  })
  const activity: any = activityResponse.data;

  if (!activity) {
    notFound()
  }

  // Fetch related activities (excluding current one, max 3)
  const allActivitiesResponse = await sanityFetch({ query: KEGIATAN_LIST_QUERY })
  const relatedActivities = ((allActivitiesResponse.data || []) as any[])
    .filter((a: any) => a._id !== activity._id).slice(0, 3)

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Date */}
          <div className="flex items-center gap-2 mb-6 border-b-4 border-foreground pb-6">
            <Calendar size={20} />
            <p className="text-lg font-black">
              {activity.date ? new Date(activity.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '-'}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-8 leading-tight">
            {activity.title}
          </h1>

          {/* Divider */}
          <div className="h-2 bg-primary mb-8"></div>

          {/* Photo Masonry Grid */}
          {activity.images && activity.images.length > 0 ? (
            <div className="columns-1 sm:columns-2 gap-4 mb-12 space-y-4">
              {activity.images.map((image: any, idx: number) => {
                const lqip = image.asset?.metadata?.lqip;
                const dimensions = image.asset?.metadata?.dimensions || { width: 800, height: 600 };

                return (
                  <div key={image._key || idx} className="break-inside-avoid relative border-4 border-foreground overflow-hidden bg-accent group">
                    <Image
                      src={urlFor(image).width(800).url()}
                      alt={activity.title || 'Foto kegiatan'}
                      width={dimensions.width}
                      height={dimensions.height}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder={lqip ? "blur" : "empty"}
                      blurDataURL={lqip || undefined}
                      priority={idx < 4}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
             <div className="mb-12 border-4 border-foreground p-8 text-center bg-accent text-accent-foreground font-black text-xl">
               Belum ada foto yang diunggah.
             </div>
          )}

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
              {relatedActivities.map((related: any) => (
                <Link
                  key={related._id}
                  href={`/kegiatan/${related.slug?.current}`}
                  className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors group block"
                >
                  <p className="text-sm font-black text-foreground group-hover:text-primary-foreground mb-3">
                    {related.date ? new Date(related.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : '-'}
                  </p>
                  <h3 className="text-lg font-black mb-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
