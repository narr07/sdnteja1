import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { BERITA_LIST_QUERY } from '@/sanity/lib/queries'
import type { BERITA_LIST_QUERYResult } from '@/sanity/types'

export const metadata = {
  title: 'Berita - SDN Teja 1',
  description: 'Daftar berita sekolah SDN Teja 1'
}

export default async function BeritaPage() {
  const { data: news } = await sanityFetch({ query: BERITA_LIST_QUERY })

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-black">Home</Link>
            <ChevronRight size={16} />
            <span className="font-black">Berita</span>
          </div>
          <h1 className="text-5xl font-black">Berita Sekolah</h1>
        </div>
      </div>

      {/* News List */}
      <div className="border-b-4 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            {news.length > 0 ? (
              news.map((item: NonNullable<BERITA_LIST_QUERYResult>[number]) => (
                <Link
                  key={item._id}
                  href={`/berita/${item.slug?.current}`}
                  className="card-brutal block group hover:bg-primary hover:text-primary-foreground transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 text-muted-foreground group-hover:text-primary-foreground transition-colors">
                        <Calendar size={18} className="shrink-0" />
                        <p className="text-sm font-black">
                          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : '-'}
                        </p>
                      </div>
                      <h2 className="text-2xl font-black mb-3">
                        {item.judul}
                      </h2>

                    </div>
                    <div className="text-2xl mt-auto mb-auto group-hover:translate-x-2 transition-transform shrink-0">
                      →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="border-4 border-foreground p-8 text-center bg-accent text-accent-foreground font-black text-xl">
                Belum ada berita yang diterbitkan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
