import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Download, 
  Search, 
  Filter,
  Image,
  Palette,
  Users,
  Briefcase
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  category: 'brand' | 'icons' | 'images' | 'partners';
  type: 'svg' | 'png' | 'jpg' | 'webp';
  path: string;
  description: string;
  tags: string[];
  size?: string;
  dimensions?: { width: number; height: number };
}

interface AssetGalleryProps {
  baseUrl?: string;
  showCopyUrl?: boolean;
  showDownload?: boolean;
  className?: string;
}

export const AssetGallery: React.FC<AssetGalleryProps> = ({
  baseUrl = 'https://ds.websolutions.eti.br',
  showCopyUrl = true,
  showDownload = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  // Mock data - Em produção, isso viria de uma API ou arquivo JSON
  const assets: Asset[] = [
    {
      id: '1',
      name: 'WebEti Logo Principal',
      category: 'brand',
      type: 'png',
      path: '/assets/brand/webeti-logo-1.png',
      description: 'Logo principal da WebSolutions ETI com texto',
      tags: ['logo', 'brand', 'principal', 'webeti'],
      dimensions: { width: 400, height: 120 }
    },
    {
      id: '2',
      name: 'WebEti Logo Alternativo',
      category: 'brand',
      type: 'png',
      path: '/assets/brand/webeti-logo-2.png',
      description: 'Logo alternativo da WebSolutions ETI',
      tags: ['logo', 'brand', 'alternativo', 'webeti'],
      dimensions: { width: 200, height: 200 }
    },
    {
      id: '3',
      name: 'Online Des Logo 1',
      category: 'partners',
      type: 'png',
      path: '/assets/partners/online-des-logo-1.png',
      description: 'Logo da parceira Online Des - versão 1',
      tags: ['parceiro', 'online.des', 'logo'],
      dimensions: { width: 300, height: 100 }
    },
    {
      id: '4',
      name: 'Online Des Logo 2',
      category: 'partners',
      type: 'png',
      path: '/assets/partners/online-des-logo-2.png',
      description: 'Logo da parceira Online Des - versão 2',
      tags: ['parceiro', 'online.des', 'logo'],
      dimensions: { width: 250, height: 150 }
    },
    {
      id: '5',
      name: 'Favicon Online Des',
      category: 'icons',
      type: 'png',
      path: '/assets/icons/favicon-online-des.png',
      description: 'Favicon da Online Des para uso em projetos',
      tags: ['favicon', 'icon', 'online.des'],
      dimensions: { width: 32, height: 32 }
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: Filter, count: assets.length },
    { id: 'brand', name: 'Marca', icon: Palette, count: assets.filter(a => a.category === 'brand').length },
    { id: 'icons', name: 'Ícones', icon: Image, count: assets.filter(a => a.category === 'icons').length },
    { id: 'partners', name: 'Parceiros', icon: Users, count: assets.filter(a => a.category === 'partners').length },
    { id: 'images', name: 'Imagens', icon: Briefcase, count: assets.filter(a => a.category === 'images').length }
  ];

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = (asset: Asset) => {
    const url = `${baseUrl}${asset.path}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada!",
      description: `${asset.name} - URL copiada para a área de transferência`,
    });
  };

  const downloadAsset = (asset: Asset) => {
    const url = `${baseUrl}${asset.path}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${asset.name}.${asset.type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado!",
      description: `${asset.name} está sendo baixado`,
    });
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    const Icon = cat?.icon || Image;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Galeria de Assets</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Buscar Assets</Label>
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Busque por nome, descrição ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={`${baseUrl}${asset.path}`}
                      alt={asset.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getCategoryIcon(asset.category)}
                      {asset.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {asset.description}
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {asset.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{asset.type.toUpperCase()}</span>
                    {asset.dimensions && (
                      <span>{asset.dimensions.width}×{asset.dimensions.height}</span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {showCopyUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(asset)}
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar URL
                      </Button>
                    )}
                    
                    {showDownload && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadAsset(asset)}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <Label className="text-xs text-muted-foreground">URL para referência:</Label>
                    <code className="block text-xs bg-muted p-2 rounded mt-1 break-all">
                      {baseUrl}{asset.path}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum asset encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou termo de busca
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Como usar</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Clique em "Copiar URL" para obter o link direto do asset</p>
          <p>• Use as URLs copiadas em qualquer projeto da WebSolutions ETI</p>
          <p>• Todos os assets são servidos via CDN para máxima performance</p>
          <p>• Tags facilitam a busca por tipo de conteúdo específico</p>
        </div>
      </div>
    </div>
  );
};

export default AssetGallery;