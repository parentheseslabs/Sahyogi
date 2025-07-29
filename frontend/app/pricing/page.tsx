import PricingPage from '../../components/Pricing/PricingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Sahyogi | Simple, Transparent Pricing',
  description: 'Choose the perfect plan for your business needs. Start free and scale as you grow with Sahyogi\'s WhatsApp automation.',
  keywords: ['pricing', 'plans', 'whatsapp automation pricing', 'sahyogi pricing', 'chatbot pricing'],
};

export default function Pricing() {
  return <PricingPage />;
}
