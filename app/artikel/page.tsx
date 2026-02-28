/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { ARTIKEL_LIST_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export const metadata = {
  title: 'Artikel - SDN Teja 1',
  description: 'Artikel dan berita dari SDN Teja 1'
}

export default async function ArtikelPage() {
  const response = await sanityFetch({ query: ARTIKEL_LIST_QUERY })
  const articles = (response.data || []) as any[]

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <span className="font-black">Artikel</span>
          </div>
          <h1 className="text-5xl font-black">Artikel & Berita</h1>
        </div>
      </div>

      {/* Articles Grid */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              articles.map((article: any) => {
                const lqip = article.gambar?.asset?.metadata?.lqip;
                const dimensions = article.gambar?.asset?.metadata?.dimensions || { width: 800, height: 600 };

                return (
                  <Link
                    key={article._id}
                    href={`/artikel/${article.slug?.current}`}
                    className="card-brutal group hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex flex-col h-full bg-accent"
                  >
                    {/* Image */}
                    {article.gambar && (
                      <div className="aspect-video relative overflow-hidden border-b-4 border-foreground">
                        <Image
                          src={urlFor(article.gambar).width(800).url()}
                          alt={article.gambar.alt || article.judul || 'Gambar artikel'}
                          width={dimensions.width}
                          height={dimensions.height}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          placeholder={lqip ? "blur" : "empty"}
                          blurDataURL={lqip || undefined}
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1 bg-background">
                      {/* Date */}
                      <p className="text-xs font-black mb-3 text-muted-foreground">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : '-'}
                      </p>

                      {/* Title */}
                      <h2 className="text-xl font-black mb-4 flex-1 leading-tight">
                        {article.judul}
                      </h2>

                      {/* Divider */}
                      <div className="border-t-4 border-foreground mb-4"></div>

                      {/* Excerpt */}
                      <p className="text-sm font-bold leading-relaxed line-clamp-3 pb-6 flex-1 text-muted-foreground">
                        {article.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="text-sm font-black text-main flex items-center gap-2 group-hover:translate-x-1 transition-transform mt-auto">
                        Baca Selengkapnya <span className="text-lg">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full border-4 border-foreground p-8 text-center bg-accent text-accent-foreground font-black text-xl">
                Belum ada artikel yang diterbitkan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
