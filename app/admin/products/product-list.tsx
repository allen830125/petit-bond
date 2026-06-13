'use client';

import { useState } from 'react';
import { useRequest } from '@/lib/hooks';
import ProductModal from './product-modal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: products = [], loading: isLoading, error: listError, execute: fetchProducts } = useRequest<Product[]>(
    `/api/products`,
    { auto: true }
  );

  const { execute: saveProduct } = useRequest(undefined, {
    auto: false,
    onSuccess: async () => {
      setIsModalOpen(false);
      setSelectedProduct(undefined);
      await fetchProducts();
    },
  });

  const { execute: deleteProductApi } = useRequest(undefined, {
    auto: false,
    onSuccess: async () => {
      setDeleteConfirm(null);
      await fetchProducts();
    },
  });

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData: any) => {
    const url = selectedProduct
      ? `/api/products/${selectedProduct.id}`
      : '/api/products';
    const method = selectedProduct ? 'PUT' : 'POST';

    await saveProduct(formData, { url, method: method as any });
  };

  const handleDeleteProductConfirm = async () => {
    if (deleteConfirm) {
      await deleteProductApi(undefined, {
        url: `/api/products/${deleteConfirm}`,
        method: 'DELETE',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">載入中...</div>
      </div>
    );
  }

  return (
    <>
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <div className="space-y-4">
        {listError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {listError.message}
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            商品列表 ({products?.length || 0})
          </h2>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 新增商品
          </button>
        </div>

        {!products || products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">還沒有商品，開始新增吧！</p>
            <button
              onClick={handleAddProduct}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              新增第一個商品
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex gap-4 items-start"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-lg font-semibold text-gray-900">
                      NT${product.price.toLocaleString()}
                    </span>
                    {product.aiGenerated && (
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        AI 生成
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString('zh-TW')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    編輯
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setDeleteConfirm(deleteConfirm === product.id ? null : product.id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      刪除
                    </button>
                    {deleteConfirm === product.id && (
                      <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                        <p className="text-xs text-gray-700 mb-2">確定刪除？</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteProductConfirm()}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                          >
                            確定
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
