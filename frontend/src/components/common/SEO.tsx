import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = 'Stelani_LM - Bolsas Artesanais em Miçangas',
  description = 'Bolsas artesanais exclusivas feitas com miçangas. Designs únicos e personalizados, feitos à mão com muito amor e dedicação.',
  image = '/images/logo.png',
  url = 'https://stelani.com.br'
}: SEOProps) {
  const fullTitle = title.includes('Stelani') ? title : `${title} | Stelani_LM`;
  const fullImage = image.startsWith('http') ? image : `${url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}