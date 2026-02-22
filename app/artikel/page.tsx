import Link from 'next/link'
import { articles } from '@/lib/data'
import { ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Artikel - SDN Teja 1',
  description: 'Artikel dan berita dari SDN Teja 1'
}

export default function ArtikelPage() {
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
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="card-brutal group hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex flex-col h-full"
              >
                {/* Date */}
                <p className="text-xs font-heading mb-3 text-foreground">
                  {new Date(article.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>

                {/* Title */}
                <h2 className="text-lg font-heading mb-4 flex-1 leading-tight">
                  {article.title}
                </h2>

                {/* Divider */}
                <div className="border-t-2 border-border mb-4"></div>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="text-sm font-heading text-main flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <span className="text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
