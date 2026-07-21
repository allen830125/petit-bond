'use client';

import { useState } from 'react';

export interface ProductImage {
  id: string;
  url: string;
  order: number;
}

export interface Product {
  id: string;
  series: string;
  seriesName: string;
  name: string;
  sub: string;
  description: string;
  bracelet: number;
  necklace: number;
  pair: number;
  stones: string[];
  images: ProductImage[];
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductModalProps {
  isOpen: boolean;
  product?: Product;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

const emptyForm = {
  series: '',
  seriesName: '',
  name: '',
  sub: '',
  description: '',
  bracelet: '',
  necklace: '',
  pair: '',
  stonesRaw: '',
};

interface NewImage {
  file: File;
  previewUrl: string;
}

export default function ProductModal({ isOpen, product, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState(() =>
    product
      ? {
          series: product.series,
          seriesName: product.seriesName,
          name: product.name,
          sub: product.sub,
          description: product.description,
          bracelet: product.bracelet.toString(),
          necklace: product.necklace.toString(),
          pair: product.pair.toString(),
          stonesRaw: Array.isArray(product.stones) ? product.stones.join('、') : '',
        }
      : emptyForm
  );
  const [existingImages, setExistingImages] = useState<ProductImage[]>(product?.images ?? []);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setNewImages(prev => [
      ...prev,
      ...files.map(file => ({ file, previewUrl: URL.createObjectURL(file) })),
    ]);
    e.target.value = '';
  };

  const removeExistingImage = (id: string) => {
    setExistingImages(prev => prev.filter(img => img.id !== id));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      if (!formData.series || !formData.name || !formData.description || !formData.bracelet) {
        throw new Error('請填寫所有必填欄位');
      }

      const stones = formData.stonesRaw
        .split(/[,、，]/)
        .map(s => s.trim())
        .filter(Boolean);

      const body = new FormData();
      body.append('series', formData.series);
      body.append('seriesName', formData.seriesName || formData.series);
      body.append('name', formData.name);
      body.append('sub', formData.sub);
      body.append('description', formData.description);
      body.append('bracelet', parseFloat(formData.bracelet).toString());
      body.append('necklace', parseFloat(formData.necklace || formData.bracelet).toString());
      body.append('pair', parseFloat(formData.pair || formData.bracelet).toString());
      body.append('stones', JSON.stringify(stones));
      body.append('keepImageIds', JSON.stringify(existingImages.map(img => img.id)));
      newImages.forEach(({ file }) => body.append('images', file));

      await onSave(body);

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失敗');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const field = (label: string, name: keyof typeof emptyForm, opts?: {
    type?: string; placeholder?: string; required?: boolean;
  }) => (
    <div>
      <label className="block text-xs font-medium tracking-wide text-taupe-600 mb-1.5">
        {label} {opts?.required !== false && <span className="text-red-500">*</span>}
      </label>
      <input
        type={opts?.type ?? 'text'}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={opts?.placeholder}
        step={opts?.type === 'number' ? '1' : undefined}
        className="w-full px-3.5 py-2 border border-cream-500 rounded-lg bg-cream-800 text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cream-50 rounded-card-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-cream-50 border-b border-cream-500 px-6 py-4 flex justify-between items-center">
          <h2 className="font-serif text-xl font-semibold text-taupe-800">
            {product ? '編輯商品' : '新增商品'}
          </h2>
          <button onClick={onClose} className="text-taupe-400 hover:text-pb-green text-2xl leading-none transition-colors">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field('系列 ID', 'series', { placeholder: 'luna' })}
              {field('系列名稱', 'seriesName', { placeholder: 'Luna 月光系列', required: false })}
            </div>

            {field('商品名稱', 'name', { placeholder: '月光·雙星' })}
            {field('副標題', 'sub', { placeholder: '人寵成對，共望星空', required: false })}

            <div>
              <label className="block text-xs font-medium tracking-wide text-taupe-600 mb-1.5">
                商品描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3.5 py-2 border border-cream-500 rounded-lg bg-cream-800 text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
                placeholder="輸入商品描述"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {field('人款手鏈 (NT$)', 'bracelet', { type: 'number', placeholder: '1280' })}
              {field('寵款項鍊 (NT$)', 'necklace', { type: 'number', placeholder: '980' })}
              {field('成對組 (NT$)', 'pair', { type: 'number', placeholder: '1980' })}
            </div>

            {field('石材（逗號分隔）', 'stonesRaw', { placeholder: '月光石、銀', required: false })}

            <div>
              <label className="block text-xs font-medium tracking-wide text-taupe-600 mb-1.5">
                商品圖片（可多選）
              </label>
              {(existingImages.length > 0 || newImages.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {existingImages.map(img => (
                    <div key={img.id} className="relative w-28 h-28">
                      <img
                        src={img.url}
                        alt="預覽"
                        className="w-28 h-28 object-cover rounded-lg border border-cream-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-taupe-800 text-cream-50 rounded-full text-xs leading-none hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {newImages.map((img, i) => (
                    <div key={img.previewUrl} className="relative w-28 h-28">
                      <img
                        src={img.previewUrl}
                        alt="預覽"
                        className="w-28 h-28 object-cover rounded-lg border border-cream-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-taupe-800 text-cream-50 rounded-full text-xs leading-none hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={handleImageSelect}
                className="w-full text-sm text-taupe-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:bg-cream-800 file:text-taupe-800 file:text-sm hover:file:bg-cream-500"
              />
              <p className="text-xs text-taupe-400 mt-1">圖片會在保存商品時一併上傳</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 sticky bottom-0 bg-cream-50 pt-4 border-t border-cream-500">
            <button
              type="button"
              onClick={onClose}
              className="font-noto-sans-tc px-4 py-2 text-sm text-taupe-600 border border-taupe-300 rounded-full hover:bg-cream-100 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="font-noto-sans-tc px-4 py-2 text-sm bg-pb-green text-cream-100 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
