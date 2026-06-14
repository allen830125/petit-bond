'use client';

import { useState, useEffect } from 'react';

interface Product {
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
  image?: string;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'aiGenerated'>;

interface ProductModalProps {
  isOpen: boolean;
  product?: Product;
  onClose: () => void;
  onSave: (product: ProductFormData | Product) => Promise<void>;
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
  image: '',
};

export default function ProductModal({ isOpen, product, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        series: product.series,
        seriesName: product.seriesName,
        name: product.name,
        sub: product.sub,
        description: product.description,
        bracelet: product.bracelet.toString(),
        necklace: product.necklace.toString(),
        pair: product.pair.toString(),
        stonesRaw: Array.isArray(product.stones) ? product.stones.join('、') : '',
        image: product.image || '',
      });
    } else {
      setFormData(emptyForm);
    }
    setError('');
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      await onSave({
        series: formData.series,
        seriesName: formData.seriesName || formData.series,
        name: formData.name,
        sub: formData.sub,
        description: formData.description,
        bracelet: parseFloat(formData.bracelet),
        necklace: parseFloat(formData.necklace || formData.bracelet),
        pair: parseFloat(formData.pair || formData.bracelet),
        stones,
        image: formData.image || undefined,
      });

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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {opts?.required !== false && <span className="text-red-500">*</span>}
      </label>
      <input
        type={opts?.type ?? 'text'}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={opts?.placeholder}
        step={opts?.type === 'number' ? '1' : undefined}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? '編輯商品' : '新增商品'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                商品描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="輸入商品描述"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {field('人款手鏈 (NT$)', 'bracelet', { type: 'number', placeholder: '1280' })}
              {field('寵款項鍊 (NT$)', 'necklace', { type: 'number', placeholder: '980' })}
              {field('成對組 (NT$)', 'pair', { type: 'number', placeholder: '1980' })}
            </div>

            {field('石材（逗號分隔）', 'stonesRaw', { placeholder: '月光石、銀', required: false })}
            {field('圖片 URL', 'image', { placeholder: '/images/product.jpg', required: false })}
          </div>

          <div className="flex justify-end gap-3 mt-6 sticky bottom-0 bg-white pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
