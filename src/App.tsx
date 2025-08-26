import { TerrazzoGenerator } from './components/TerrazzoGenerator';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Tool */}
      <main className="py-12">
        <TerrazzoGenerator />
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}