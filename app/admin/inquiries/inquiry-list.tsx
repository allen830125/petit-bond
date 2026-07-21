'use client';

import { useState } from 'react';
import { useRequest } from '@/lib/hooks';

interface Inquiry {
  id: string;
  name: string;
  variant: string;
  qty: number;
  size?: string | null;
  contactType: string;
  contact: string;
  notes?: string | null;
  status: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    seriesName: string;
  };
}

const VARIANT_LABELS: Record<string, string> = {
  bracelet: '人款手鏈',
  necklace: '寵款項鍊',
  pair: '成對組',
};

const CONTACT_TYPE_LABELS: Record<string, string> = {
  line: 'LINE',
  instagram: 'Instagram',
  phone: '電話',
  email: 'Email',
};

const STATUS_OPTIONS = [
  { value: 'pending', label: '待處理' },
  { value: 'contacted', label: '已聯繫' },
  { value: 'completed', label: '已完成' },
];

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-gold-100 text-gold-700',
  contacted: 'bg-sage-100 text-forest-600',
  completed: 'bg-cream-300 text-taupe-700',
};

export default function InquiryList() {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const {
    data: inquiries = [],
    loading: isLoading,
    error: listError,
    execute: fetchInquiries,
  } = useRequest<Inquiry[]>('/api/inquiries', { auto: true });

  const { execute: updateStatus } = useRequest(undefined, {
    auto: false,
    onSuccess: async () => {
      await fetchInquiries();
    },
  });

  const { execute: deleteInquiryApi } = useRequest(undefined, {
    auto: false,
    onSuccess: async () => {
      setDeleteConfirm(null);
      await fetchInquiries();
    },
  });

  const handleStatusChange = async (id: string, status: string) => {
    await updateStatus({ status }, { url: `/api/inquiries/${id}`, method: 'PATCH' });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm) {
      await deleteInquiryApi(undefined, {
        url: `/api/inquiries/${deleteConfirm}`,
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
    <div className="space-y-4">
      {listError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {listError.message}
        </div>
      )}

      <h2 className="font-serif text-lg font-semibold text-taupe-800">
        預購單列表 ({inquiries?.length || 0})
      </h2>

      {!inquiries || inquiries.length === 0 ? (
        <div className="bg-cream-50 border border-cream-500 rounded-card-lg p-8 text-center">
          <p className="font-noto-sans-tc text-taupe-500">目前還沒有收到預購單。</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-cream-50 border border-cream-500 rounded-card p-4 flex flex-wrap gap-4 items-start hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-serif font-medium text-taupe-800">{inquiry.name}</h3>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs rounded-pill tracking-wide ${STATUS_STYLES[inquiry.status] || STATUS_STYLES.pending}`}
                  >
                    {STATUS_OPTIONS.find((s) => s.value === inquiry.status)?.label || inquiry.status}
                  </span>
                </div>
                <p className="font-noto-sans-tc text-taupe-600 text-sm">
                  {inquiry.product.name}（{inquiry.product.seriesName}） ·{' '}
                  {VARIANT_LABELS[inquiry.variant] || inquiry.variant} × {inquiry.qty}
                  {inquiry.size && ` · 尺寸 ${inquiry.size}`}
                </p>
                <p className="font-noto-sans-tc text-taupe-600 text-sm mt-1">
                  {CONTACT_TYPE_LABELS[inquiry.contactType] || inquiry.contactType}：{inquiry.contact}
                </p>
                {inquiry.notes && (
                  <p className="font-noto-sans-tc text-taupe-500 text-sm mt-1">備註：{inquiry.notes}</p>
                )}
                <span className="font-noto-sans-tc text-xs text-taupe-400 mt-2 inline-block">
                  {new Date(inquiry.createdAt).toLocaleString('zh-TW')}
                </span>
              </div>

              <div className="flex flex-col items-end gap-2">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                  className="font-noto-sans-tc text-sm border border-taupe-300 rounded-lg px-2 py-1.5 text-taupe-700 focus:outline-none focus:ring-2 focus:ring-pb-green"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <button
                    onClick={() => setDeleteConfirm(deleteConfirm === inquiry.id ? null : inquiry.id)}
                    className="font-noto-sans-tc px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    刪除
                  </button>
                  {deleteConfirm === inquiry.id && (
                    <div className="absolute top-full right-0 mt-2 bg-cream-50 border border-gold-300 rounded-lg shadow-lg p-3 z-10 whitespace-nowrap">
                      <p className="font-noto-sans-tc text-xs text-taupe-600 mb-2">確定刪除？</p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDeleteConfirm}
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
  );
}
