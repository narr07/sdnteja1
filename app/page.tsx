import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Trophy, BookOpen } from 'lucide-react'
import { schoolData, highlights } from '@/lib/data'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading tracking-tighter">
              SDN TEJA 1
            </h1>
            <p className="text-2xl font-heading max-w-2xl text-foreground">
              Membangun Generasi Cerdas, Berkarakter, dan Bermoral Tinggi
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/profil/visi-misi"
                className="btn-brutal inline-flex items-center gap-2 text-lg"
              >
                Pelajari Lebih Lanjut
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/kegiatan"
                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 font-heading text-lg border-2 border-border hover:shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                Lihat Kegiatan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-brutal">
              <div className="flex items-start gap-4">
                <Users size={32} className="shrink-0" />
                <div>
                  <p className="text-5xl font-heading">{schoolData.stats.students}</p>
                  <p className="text-sm font-heading mt-2">Siswa Aktif</p>
                </div>
              </div>
            </div>
            <div className="card-brutal">
              <div className="flex items-start gap-4">
                <BookOpen size={32} className="shrink-0" />
                <div>
                  <p className="text-5xl font-heading">{schoolData.stats.teachers}</p>
                  <p className="text-sm font-heading mt-2">Guru Berpengalaman</p>
                </div>
              </div>
            </div>
            <div className="card-brutal">
              <div className="flex items-start gap-4">
                <Trophy size={32} className="shrink-0" />
                <div>
                  <p className="text-5xl font-heading">{schoolData.stats.achievements}</p>
                  <p className="text-sm font-heading mt-2">Prestasi Diraih</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Highlight */}
      <section className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-heading mb-8 border-b-2 border-border pb-4">Visi & Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-brutal bg-main text-main-foreground">
              <h3 className="text-2xl font-heading mb-4">Visi</h3>
              <p className="text-base leading-relaxed">
                {schoolData.visi}
              </p>
            </div>
            <div className="card-brutal">
              <h3 className="text-2xl font-heading mb-4">Misi</h3>
              <ul className="space-y-3">
                {schoolData.misi.map((m, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-heading shrink-0">•</span>
                    <span className="text-sm">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-heading border-b-2 border-border pb-4">Berita Terbaru</h2>
            <Link
              href="/berita"
              className="font-heading hover:shadow-brutal px-4 py-2 border-2 border-border flex items-center gap-2 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Lihat Semua
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.latestNews.map((newsItem) => (
              <Link
                key={newsItem.id}
                href={`/berita/${newsItem.slug}`}
                className="card-brutal group hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <p className="text-xs font-heading mb-3">
                  {new Date(newsItem.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <h3 className="text-lg font-heading mb-3 leading-tight">
                  {newsItem.title}
                </h3>
                <div className="border-t-2 border-border pt-3 mb-3"></div>
                <p className="text-sm line-clamp-2">
                  {newsItem.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-heading border-b-2 border-border pb-4">Artikel Terbaru</h2>
            <Link
              href="/artikel"
              className="font-heading hover:shadow-brutal px-4 py-2 border-2 border-border flex items-center gap-2 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Lihat Semua
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="card-brutal group hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <p className="text-xs font-heading mb-3">
                  {new Date(article.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <h3 className="text-lg font-heading mb-3 leading-tight">
                  {article.title}
                </h3>
                <div className="border-t-2 border-border pt-3 mb-3"></div>
                <p className="text-sm line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-heading border-b-2 border-border pb-4">Kegiatan Mendatang</h2>
            <Link
              href="/kegiatan"
              className="font-heading hover:shadow-brutal px-4 py-2 border-2 border-border flex items-center gap-2 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Lihat Semua
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.upcomingActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/kegiatan/${activity.slug}`}
                className="card-brutal group hover:shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex flex-col p-0 overflow-hidden"
              >
                {/* Photo */}
                <div className="aspect-video relative border-b-2 border-border bg-accent">
                  <Image
                    src={activity.photo}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-heading mb-3">
                    {new Date(activity.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-lg font-heading mb-3 leading-tight">
                    {activity.title}
                  </h3>
                  <div className="border-t-2 border-border pt-3 mb-3"></div>
                  <p className="text-sm line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
