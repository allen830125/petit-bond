'use client';

import { useState } from 'react';
import { useRequest } from '@/lib/hooks';
import ProductModal, { type Product } from './product-modal';

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

  const handleSaveProduct = async (formData: FormData) => {
    const url = selectedProduct
      ? `/api/products/${selectedProduct.id}`
      : '/api/products';
    const method: 'POST' | 'PUT' = selectedProduct ? 'PUT' : 'POST';

    await saveProduct(formData, { url, method });
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
        <div className="font-noto-sans-tc text-taupe-400 text-sm">載入中...</div>
      </div>
    );
  }

  return (
    <>
      <ProductModal
        key={`${isModalOpen}-${selectedProduct?.id ?? 'new'}`}
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <div className="space-y-4">
        {listError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {listError.message}
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="font-serif text-lg font-semibold text-taupe-800">
            商品列表 ({products?.length || 0})
          </h2>
          <button
            onClick={handleAddProduct}
            className="font-noto-sans-tc bg-pb-green text-cream-100 text-sm tracking-wide px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-medium"
          >
            + 新增商品
          </button>
        </div>

        {!products || products.length === 0 ? (
          <div className="bg-cream-50 border border-cream-500 rounded-card-lg p-8 text-center">
            <p className="font-noto-sans-tc text-taupe-500 mb-4">還沒有商品，開始新增吧！</p>
            <button
              onClick={handleAddProduct}
              className="inline-block font-noto-sans-tc bg-pb-green text-cream-100 text-sm tracking-wide px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-medium"
            >
              新增第一個商品
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-cream-50 border border-cream-500 rounded-card p-4 flex gap-4 items-start hover:shadow-md transition-shadow"
              >
                {product.images[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-medium text-taupe-800">{product.name}</h3>
                  <p className="font-noto-sans-tc text-taupe-500 text-sm line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="font-cormorant text-lg font-semibold text-pb-green">
                      成對 NT${product.pair.toLocaleString()}
                    </span>
                    {product.aiGenerated && (
                      <span className="inline-block px-2.5 py-1 bg-gold-100 text-gold-700 text-xs rounded-pill tracking-wide">
                        AI 生成
                      </span>
                    )}
                    <span className="font-noto-sans-tc text-xs text-taupe-400">
                      {new Date(product.createdAt).toLocaleDateString('zh-TW')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="font-noto-sans-tc px-3 py-1 text-sm text-pb-green hover:bg-cream-100 rounded-lg transition-colors"
                  >
                    編輯
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setDeleteConfirm(deleteConfirm === product.id ? null : product.id)}
                      className="font-noto-sans-tc px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      刪除
                    </button>
                    {deleteConfirm === product.id && (
                      <div className="absolute top-full right-0 mt-2 bg-cream-50 border border-gold-300 rounded-lg shadow-lg p-3 z-10 whitespace-nowrap">
                        <p className="font-noto-sans-tc text-xs text-taupe-600 mb-2">確定刪除？</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteProductConfirm()}
                            className="px-2.5 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                          >
                            確定
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2.5 py-1 bg-cream-200 text-taupe-700 text-xs rounded-lg hover:bg-cream-300 transition-colors"
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
