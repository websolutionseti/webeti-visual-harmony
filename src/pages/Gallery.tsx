import React from 'react';
import Navigation from '@/components/Navigation';
import { AssetGallery } from '@/modules/gallery';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Design System
            </Button>
          </Link>
        </div>

        <AssetGallery 
          baseUrl="https://ds.websolutions.eti.br"
          showCopyUrl={true}
          showDownload={true}
        />
      </div>
    </div>
  );
};

export default Gallery;