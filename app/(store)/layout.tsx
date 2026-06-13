import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-[#f8f4ea]">
        {children}
      </main>
      <Footer />
    </>
  )
}
