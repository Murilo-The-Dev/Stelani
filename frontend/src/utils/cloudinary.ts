export function optimizeCloudinaryUrl(url: string): string {
  if (!url.includes('cloudinary.com')) return url;
  
  // Adiciona transformações: qualidade auto, formato auto, lazy loading
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  
  return `${parts[0]}/upload/f_auto,q_auto,w_800,c_limit/${parts[1]}`;
}