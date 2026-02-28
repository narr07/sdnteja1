/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { ARTIKEL_DETAIL_QUERY, ARTIKEL_LIST_QUERY } from '@/sanity/lib/queries'
import { defineQuery } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

export const metadata = {
  title: 'Detail Artikel - SDN Teja 1',
}

export async function generateStaticParams() {
  const SLUGS_QUERY = defineQuery(`*[_type == "artikel" && defined(slug.current)]{"slug": slug.current}`)
  const data = await client.fetch(SLUGS_QUERY)
  return data.map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const articleResponse = await sanityFetch({
    query: ARTIKEL_DETAIL_QUERY,
    params: { slug }
  })
  const article: any = articleResponse.data;

  if (!article) {
    notFound()
  }

  // Fetch related articles (excluding current one, max 3)
  const allArticlesResponse = await sanityFetch({ query: ARTIKEL_LIST_QUERY })
  const relatedArticles = ((allArticlesResponse.data || []) as any[])
    .filter((a: any) => a._id !== article._id).slice(0, 3)

  const lqip = article.gambar?.asset?.metadata?.lqip;

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <Link href="/artikel" className="hover:underline font-black">Artikel</Link>
            <ChevronRight size={16} />
            <span className="font-black line-clamp-1">{article.judul}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Date & Author */}
          <div className="flex items-center justify-between mb-6 border-b-4 border-foreground pb-6">
            <div className="flex items-center gap-2">
                <Calendar size={20} />
                <p className="text-lg font-black">
                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : '-'}
                </p>
            </div>
            {article.guruNama && (
                <p className="text-md font-bold text-muted-foreground bg-accent px-4 py-1 border-2 border-foreground">
                    Oleh: {article.guruNama}
                </p>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-8 leading-tight">
            {article.judul}
          </h1>

          {/* Divider */}
          <div className="h-2 bg-primary mb-8"></div>

          {/* Image Content */}
          {article.gambar && (
            <div className="mb-8 aspect-video relative overflow-hidden border-4 border-foreground bg-accent">
                <Image
                src={urlFor(article.gambar).width(800).url()}
                alt={article.gambar.alt || article.judul || 'Gambar artikel'}
                width={800}
                height={400}
                className="w-full h-full object-cover"
                placeholder={lqip ? "blur" : "empty"}
                blurDataURL={lqip || undefined}
                priority
                />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12 prose-headings:font-black prose-p:font-bold prose-p:leading-relaxed">
              {article.isi ? <PortableText value={article.isi} /> : <p>Belum ada isi.</p>}
          </div>

          {/* Back Button */}
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-black border-2 border-foreground hover:scale-105 active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
            Kembali ke Artikel
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-b-4 border-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Artikel Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => (
                <Link
                  key={related._id}
                  href={`/artikel/${related.slug?.current}`}
                  className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors group block"
                >
                  <p className="text-sm font-black text-foreground group-hover:text-primary-foreground mb-3">
                    {related.publishedAt ? new Date(related.publishedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : '-'}
                  </p>
                  <h3 className="text-lg font-black mb-2 border-b-2 border-border pb-2">
                    {related.judul}
                  </h3>
                  <p className="text-sm font-bold line-clamp-3 text-muted-foreground">
                    {related.excerpt}
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
