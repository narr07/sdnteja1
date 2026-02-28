import { CheckCircle } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { SEKOLAH_PROFIL_QUERY } from '@/sanity/lib/queries'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

export const metadata = {
  title: 'Visi Misi - SDN Teja 1',
  description: 'Visi dan Misi SDN Teja 1'
}

const misiComponents: PortableTextComponents = {
  list: {
    number: ({children}) => (
      <ol className="space-y-4 [counter-reset:misi] list-none pl-0">
        {children}
      </ol>
    )
  },
  listItem: {
    number: ({children}) => (
      <li className="flex gap-4 items-start">
        <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-black shrink-0 [counter-increment:misi] before:content-[counter(misi)]" />
        <div className="font-bold text-base leading-relaxed pt-1">
          {children}
        </div>
      </li>
    )
  }
}

const tujuanComponents: PortableTextComponents = {
  list: {
    bullet: ({children}) => <ul className="space-y-4">{children}</ul>,
    number: ({children}) => <ol className="space-y-4 list-decimal list-inside">{children}</ol>
  },
  listItem: {
    bullet: ({children}) => (
      <li className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
        <span className="font-bold text-lg">{children}</span>
      </li>
    ),
    number: ({children}) => (
      <li className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-bold text-lg">
        {children}
      </li>
    )
  },
  block: {
    normal: ({children}) => (
      <p className="border-4 border-foreground p-6 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-bold text-lg mb-4">
        {children}
      </p>
    )
  }
}

export default async function VisiMisiPage() {
  const { data } = await sanityFetch({ query: SEKOLAH_PROFIL_QUERY })

  return (
    <div className="bg-background border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visi */}
          <div className="border-4 border-foreground p-8 h-fit bg-primary text-primary-foreground">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <CheckCircle size={32} />
              VISI
            </h2>
            <div className="text-lg leading-relaxed font-bold">
              {data?.visi ? (
                <PortableText value={data.visi} />
              ) : (
                <p>Visi belum diatur.</p>
              )}
            </div>
          </div>

          {/* Misi */}
          <div className="border-4 border-foreground p-8 bg-background">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <CheckCircle size={32} />
              MISI
            </h2>
            {data?.misi ? (
              <PortableText value={data.misi} components={misiComponents} />
            ) : (
              <p className="font-bold">Misi belum diatur.</p>
            )}
          </div>
        </div>

        {/* Tujuan Section */}
        <div className="mt-16 border-4 border-foreground p-8 bg-background">
          <h2 className="text-3xl font-black mb-8 border-b-4 border-foreground pb-4">Tujuan Sekolah</h2>
          <div className="grid grid-cols-1 gap-4">
            {data?.tujuan ? (
              <PortableText value={data.tujuan} components={tujuanComponents} />
            ) : (
              <p className="font-bold">Tujuan belum diatur.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
