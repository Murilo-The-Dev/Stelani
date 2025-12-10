import { useState } from 'react';
import Button from './Button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[] | ((prev: string[]) => string[])) => void;
  maxImages?: number;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 6,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = 'dtrdryp2k'; // <<<< COLE AQUI
  const UPLOAD_PRESET = 'stelani_products';

  const openUploadWidget = () => {
  setUploading(true);

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: maxImages - images.length,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxFileSize: 5000000, // 5MB
        theme: 'purple',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#D8B4FE',
            tabIcon: '#A855F7',
            menuIcons: '#A855F7',
            textDark: '#1F2937',
            textLight: '#FFFFFF',
            link: '#A855F7',
            action: '#A855F7',
            inactiveTabIcon: '#D1D5DB',
            error: '#EF4444',
            inProgress: '#A855F7',
            complete: '#10B981',
            sourceBg: '#F9FAFB',
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const newImage = result.info.secure_url;
          onImagesChange([...images, newImage]);
        }

        if (result.event === 'close') {
          setUploading(false);
        }
      }
    );

    widget.open();
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imagens do Produto
        </label>
        {images.length < maxImages && (
          <Button
            type="button"
            onClick={openUploadWidget}
            disabled={uploading}
            size="sm"
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Enviando...' : 'Adicionar Imagem'}
          </Button>
        )}
      </div>

      {/* Grid de imagens */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-purple-200 group"
            >
              <img
                src={image}
                alt={`Produto ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto text-purple-300 mb-3" />
          <p className="text-sm text-purple-600 mb-2">
            Nenhuma imagem adicionada
          </p>
          <Button
            type="button"
            onClick={openUploadWidget}
            disabled={uploading}
            size="sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Enviando...' : 'Adicionar Primeira Imagem'}
          </Button>
        </div>
      )}

      <p className="text-xs text-purple-500">
        💡 Dica: A primeira imagem será a principal. Máximo {maxImages} imagens.
        Formatos: JPG, PNG, WEBP (até 5MB cada).
      </p>
    </div>
  );
}