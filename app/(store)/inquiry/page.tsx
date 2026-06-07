'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  productId: string;
  customization: string;
  notes: string;
}

export default function InquiryPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || '';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    productId: productId,
    customization: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const products = [
    { id: '1', name: '貓咪項圈吊飾' },
    { id: '2', name: '狗狗蝴蝶結' },
    { id: '3', name: '手工編織項圈' },
    { id: '4', name: '珍珠吊墜項圈' },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        productId: '',
        customization: '',
        notes: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">預購詢問表</h1>
        <p className="text-slate-600 mb-8">
          填寫以下資訊，我們會盡快與您聯繫確認預購詳情。
        </p>

        {submitted && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ 感謝您的預購詢問！我們會盡快與您聯繫。
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              placeholder="請輸入您的姓名"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              電話
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
              placeholder="0912-345-678"
            />
          </div>

          {/* Product Selection */}
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              想要的商品 <span className="text-red-500">*</span>
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
            >
              <option value="">-- 請選擇商品 --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Customization Field */}
          <div>
            <label
              htmlFor="customization"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              客製化需求
            </label>
            <textarea
              id="customization"
              name="customization"
              value={formData.customization}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent resize-none"
              placeholder="例如：顏色偏好、尺寸、特殊設計需求等..."
            />
          </div>

          {/* Notes Field */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-slate-900 mb-1"
            >
              其他備註
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent resize-none"
              placeholder="任何其他想告訴我們的事..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
          >
            送出預購詢問
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-900 text-sm">
            <strong>📧 提示：</strong> 提交表單後，我們會透過 Email
            與您確認預購詳情和報價。
          </p>
        </div>
      </div>
    </div>
  );
}
