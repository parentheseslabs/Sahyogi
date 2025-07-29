import ResourcesPage from '../../components/Resources/ResourcesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources - Sahyogi | Blog, Guides & Case Studies',
  description: 'Insights, guides, and success stories to help you grow your business with WhatsApp automation. Learn from real case studies and expert tips.',
  keywords: ['whatsapp automation blog', 'business guides', 'case studies', 'ai automation tips', 'sahyogi resources'],
};

export default function Resources() {
  return <ResourcesPage />;
}
