import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profilMenus = [
    { href: '/profil/visi-misi', label: 'Visi Misi' },
    { href: '/profil/guru', label: 'Guru' },
    { href: '/profil/data-sekolah', label: 'Data Sekolah' },
  ]

  return (
    <div>
      {/* Breadcrumb & Submenu */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/" className="hover:underline font-bold">Home</Link>
            <ChevronRight size={16} />
            <span className="font-bold">Profil</span>
          </div>

          <h1 className="text-5xl font-black mb-8">Profil Sekolah</h1>

          {/* Submenu */}
          <div className="flex flex-wrap gap-2">
            {profilMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="border-2 border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors text-sm"
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  )
}
