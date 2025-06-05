import ClientPage from "@/components/client-page"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData language="en" isHomePage={true} />
      <ClientPage />
    </>
  )
}
