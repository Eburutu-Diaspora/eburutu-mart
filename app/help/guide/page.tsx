import UserGuideContent from "@/components/UserGuideContent";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

export default function UserGuidePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4">
        <UserGuideContent />
      </main>
      <Footer />
    </>
  );
}
