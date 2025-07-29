import ProductPage from '../../components/Product/ProductPage';

export default function Product() {
  return (
    <main style={{ paddingTop: '120px' }}>
      <ProductPage />
    </main>
  );
}

export const metadata = {
  title: 'Sahyogi - Your All-In-One Business Tool on WhatsApp',
  description: 'Sahyogi brings chatbot flows, campaign management, invoicing, and analytics—all into WhatsApp. One login. Zero code.',
  keywords: ['WhatsApp business', 'chatbot builder', 'campaign management', 'business automation', 'WhatsApp analytics']
};
