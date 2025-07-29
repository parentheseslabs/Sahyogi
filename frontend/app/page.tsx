import Image from "next/image";
import styles from "./page.module.css";
import Hero from '../components/Home/Hero';
import WhySahyogi from '../components/Home/WhySahyogi';
import ProductSpotlight from '../components/Home/ProductSpotlight';
import CoreServices from '../components/Home/CoreServices';
import Testimonials from '../components/Home/Testimonials';
import CallToAction from '../components/Home/CallToAction';
import Footer from '../components/Home/Footer';
import AboutPage from '../components/About/AboutPage';
import ProductPage from '../components/Product/ProductPage';
import ResourcesSection from '../components/Home/ResourcesSection';
import ContactSection from '../components/Home/ContactSection';
export default function Home() {
  return (
    <main>
      <Hero />
      <WhySahyogi />
      <ProductSpotlight />
      <CoreServices />
      <Testimonials />
      <CallToAction />
      
      {/* About Us section */}
      <section id="about" style={{ scrollMarginTop: '120px' }}>
        <div style={{ width: '100%', textAlign: 'center', margin: 'clamp(2rem, 4vw, 4rem) 0 clamp(1rem, 2vw, 2rem) 0' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1a355e', letterSpacing: '-0.025em', marginBottom: 'clamp(1rem, 2vw, 2rem)' }}>About Us</h2>
        </div>
        <AboutPage />
      </section>
      
      {/* Product section */}
      <section id="product" style={{ scrollMarginTop: '120px' }}>
        <div style={{ width: '100%', textAlign: 'center', margin: 'clamp(2rem, 4vw, 4rem) 0 clamp(1rem, 2vw, 2rem) 0' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1a355e', letterSpacing: '-0.025em', marginBottom: 'clamp(1rem, 2vw, 2rem)' }}>Product</h2>
        </div>
        <ProductPage />
      </section>

      {/* Resources section */}
      <section id="resources" style={{ scrollMarginTop: '120px' }}>
        <ResourcesSection />
      </section>

      {/* Contact section */}
      <section id="contact" style={{ scrollMarginTop: '120px' }}>
        <ContactSection />
      </section>

    </main>
  );
}
