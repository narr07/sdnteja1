'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isPLofilDropdownOpen, setIsProfilDropdownOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="border-b-4 border-foreground bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-black tracking-tighter">
            SDN TEJA 1
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={`font-bold text-base border-2 px-3 py-2 transition-all ${
                isActive('/')
                  ? 'border-b-4 border-main bg-main text-main-foreground'
                  : 'border-transparent hover:border-b-4 hover:border-main'
              }`}
            >
              Home
            </Link>

            {/* Profil Dropdown */}
            <div className="relative group">
              <button className={`font-bold text-base border-2 px-3 py-2 transition-all flex items-center gap-1 ${
                isActive('/profil')
                  ? 'border-b-4 border-main bg-main text-main-foreground'
                  : 'border-transparent hover:border-b-4 hover:border-main'
              }`}>
                Profil
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-background border-4 border-foreground opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 shadow-lg">
                <Link
                  href="/profil/visi-misi"
                  className="block px-4 py-3 font-bold text-sm hover:bg-primary hover:text-primary-foreground border-b-2 border-foreground transition-colors"
                >
                  Visi Misi
                </Link>
                <Link
                  href="/profil/guru"
                  className="block px-4 py-3 font-bold text-sm hover:bg-primary hover:text-primary-foreground border-b-2 border-foreground transition-colors"
                >
                  Guru
                </Link>
                <Link
                  href="/profil/data-sekolah"
                  className="block px-4 py-3 font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Data Sekolah
                </Link>
              </div>
            </div>

            <Link
              href="/kegiatan"
              className={`font-bold text-base border-2 px-3 py-2 transition-all ${
                isActive('/kegiatan')
                  ? 'border-b-4 border-main bg-main text-main-foreground'
                  : 'border-transparent hover:border-b-4 hover:border-main'
              }`}
            >
              Kegiatan
            </Link>

            <Link
              href="/berita"
              className={`font-bold text-base border-2 px-3 py-2 transition-all ${
                isActive('/berita')
                  ? 'border-b-4 border-main bg-main text-main-foreground'
                  : 'border-transparent hover:border-b-4 hover:border-main'
              }`}
            >
              Berita
            </Link>

            <Link
              href="/artikel"
              className={`font-bold text-base border-2 px-3 py-2 transition-all ${
                isActive('/artikel')
                  ? 'border-b-4 border-main bg-main text-main-foreground'
                  : 'border-transparent hover:border-b-4 hover:border-main'
              }`}
            >
              Artikel
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden border-2 border-foreground p-2 hover:bg-primary transition-colors"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t-2 border-border pb-4">
            <Link
              href="/"
              className={`block font-bold text-base px-4 py-3 border-b-2 border-border transition-colors ${
                isActive('/')
                  ? 'bg-main text-main-foreground'
                  : 'hover:bg-main hover:text-main-foreground'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Profil Submenu */}
            <div>
              <button
                onClick={() => setIsProfilDropdownOpen(!isPLofilDropdownOpen)}
                className={`w-full text-left font-bold text-base px-4 py-3 border-b-2 border-border transition-colors flex items-center justify-between ${
                  isActive('/profil')
                    ? 'bg-main text-main-foreground'
                    : 'hover:bg-main hover:text-main-foreground'
                }`}
              >
                Profil
                <ChevronDown size={16} className={isPLofilDropdownOpen ? 'rotate-180' : 'transition-transform'} />
              </button>
              {isPLofilDropdownOpen && (
                <div className="border-l-2 border-main bg-secondary-background">
                  <Link
                    href="/profil/visi-misi"
                    className="block font-bold text-sm px-8 py-2 border-b border-border transition-colors hover:bg-main hover:text-main-foreground"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Visi Misi
                  </Link>
                  <Link
                    href="/profil/guru"
                    className="block font-bold text-sm px-8 py-2 border-b border-border transition-colors hover:bg-main hover:text-main-foreground"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Guru
                  </Link>
                  <Link
                    href="/profil/data-sekolah"
                    className="block font-bold text-sm px-8 py-2 transition-colors hover:bg-main hover:text-main-foreground"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Data Sekolah
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/kegiatan"
              className={`block font-bold text-base px-4 py-3 border-b-2 border-border transition-colors ${
                isActive('/kegiatan')
                  ? 'bg-main text-main-foreground'
                  : 'hover:bg-main hover:text-main-foreground'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Kegiatan
            </Link>

            <Link
              href="/berita"
              className={`block font-bold text-base px-4 py-3 border-b-2 border-border transition-colors ${
                isActive('/berita')
                  ? 'bg-main text-main-foreground'
                  : 'hover:bg-main hover:text-main-foreground'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Berita
            </Link>

            <Link
              href="/artikel"
              className={`block font-bold text-base px-4 py-3 border-b-2 border-border transition-colors ${
                isActive('/artikel')
                  ? 'bg-main text-main-foreground'
                  : 'hover:bg-main hover:text-main-foreground'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Artikel
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
