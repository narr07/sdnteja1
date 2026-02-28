import Link from 'next/link'
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { BERITA_DETAIL_QUERY, BERITA_LIST_QUERY } from '@/sanity/lib/queries'
import type { BERITA_LIST_QUERYResult } from '@/sanity/types'
import { PortableText } from '@portabletext/react'
import { defineQuery } from 'next-sanity'

export const metadata = {
  title: 'Detail Berita - SDN Teja 1',
}

export async function generateStaticParams() {
  const SLUGS_QUERY = defineQuery(`*[_type == "berita" && defined(slug.current)]{"slug": slug.current}`)
  const data = await client.fetch(SLUGS_QUERY)
  return data.map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: newsItem } = await sanityFetch({
    query: BERITA_DETAIL_QUERY,
    params: { slug }
  })

  if (!newsItem) {
    notFound()
  }

  // Fetch related news (excluding current one, max 3)
  const { data: allNews } = await sanityFetch({ query: BERITA_LIST_QUERY })
  type RelatedNewsItem = NonNullable<BERITA_LIST_QUERYResult>[number] & { description?: string; };
  const relatedNews = allNews.filter((n: RelatedNewsItem) => n._id !== newsItem._id).slice(0, 3)

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <Link href="/berita" className="hover:underline font-black">Berita</Link>
            <ChevronRight size={16} />
            <span className="font-black line-clamp-1">{newsItem.judul}</span>
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
              {newsItem.publishedAt ? new Date(newsItem.publishedAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '-'}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-8 leading-tight">
            {newsItem.judul}
          </h1>

          {/* Divider */}
          <div className="h-2 bg-primary mb-8"></div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {newsItem.isi ? (
              <PortableText
                value={newsItem.isi}
                components={{
                  block: {
                    normal: ({children}) => <p className="text-lg leading-relaxed font-bold mb-6">{children}</p>,
                    h2: ({children}) => <h2 className="text-3xl font-black mt-12 mb-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-black mt-8 mb-4">{children}</h3>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 font-bold">{children}</blockquote>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="list-disc pl-6 mb-6 font-bold space-y-2">{children}</ul>,
                    number: ({children}) => <ol className="list-decimal pl-6 mb-6 font-bold space-y-2">{children}</ol>,
                  }
                }}
              />
            ) : null}
          </div>

          {/* Back Button */}
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-black border-2 border-foreground hover:scale-105 active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
            Kembali ke Berita
          </Link>
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="border-b-4 border-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((related: RelatedNewsItem) => (
                <Link
                  key={related._id}
                  href={`/berita/${related.slug?.current}`}
                  className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors group block"
                >
                  <p className="text-sm font-black text-foreground group-hover:text-primary-foreground mb-3">
                    {related.publishedAt ? new Date(related.publishedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : '-'}
                  </p>
                  <h3 className="text-lg font-black mb-2">
                    {related.judul}
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
