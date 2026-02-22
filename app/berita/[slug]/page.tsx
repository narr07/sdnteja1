import Link from 'next/link'
import Image from 'next/image'
import { news } from '@/lib/data'
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Detail Berita - SDN Teja 1',
}

export async function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }))
}

export default function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const newsItem = news.find(n => n.slug === params.slug)

  if (!newsItem) {
    notFound()
  }

  const relatedNews = news.filter(n => n.id !== newsItem.id).slice(0, 3)

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
            <span className="font-black line-clamp-1">{newsItem.title}</span>
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
              {new Date(newsItem.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-8 leading-tight">
            {newsItem.title}
          </h1>

          {/* Divider */}
          <div className="h-2 bg-primary mb-8"></div>

          {/* Image Content */}
          <div className="mb-8 aspect-video relative overflow-hidden border-4 border-foreground bg-accent">
            <Image
              src={newsItem.photo}
              alt={newsItem.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed font-bold whitespace-pre-wrap">
              {newsItem.fullContent}
            </p>
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
              {relatedNews.map((related) => (
                <Link
                  key={related.id}
                  href={`/berita/${related.slug}`}
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
