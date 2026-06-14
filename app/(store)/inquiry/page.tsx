'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, Variant, fmt } from '@/lib/products';

function PreInquiryForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get('productId');
  const variantParam = searchParams.get('variant') as Variant | null;

  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(productId || '');
  const [variant, setVariant] = useState<Variant>(variantParam || 'pair');
  const [qty, setQty] = useState('1');
  const [size, setSize] = useState('');
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('line');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');

  const product = selectedProduct
    ? PRODUCTS.find((p) => p.id === selectedProduct)
    : null;

  const variantOptions = [
    { value: 'bracelet', label: '人款手鏈' },
    { value: 'necklace', label: '寵款項鍊' },
    { value: 'pair', label: '成對組 ♡' },
  ];

  const contactTypes = [
    { value: 'line', label: 'LINE' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'phone', label: '電話' },
    { value: 'email', label: 'Email' },
  ];

  const getPrice = () => {
    if (!product) return 0;
    switch (variant) {
      case 'bracelet':
        return product.bracelet;
      case 'necklace':
        return product.necklace;
      case 'pair':
        return product.pair;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !contact) {
      alert('請填寫稱呼和聯繫方式');
      return;
    }

    if (!selectedProduct) {
      alert('請選擇預購款式');
      return;
    }

    console.log({
      productId: selectedProduct,
      variant,
      qty,
      size,
      name,
      contactType,
      contact,
      notes,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] bg-cream-100 flex items-center justify-center">
        <div className="max-w-[680px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
          <div className="text-[60px] mb-6">♡</div>
          <h1 className="font-serif font-semibold text-[clamp(28px,4vw,40px)] text-pb-green mb-6">
            收到你的預購了！
          </h1>
          <p className="font-noto-sans-tc text-taupe-600 text-[clamp(14px,1.5vw,16px)] leading-[1.9] mb-8 max-w-[500px] mx-auto">
            感謝你的信任！我們會盡快檢查預購詳情，並通過你選擇的聯繫方式與你確認商品和報價。
          </p>
          <button
            onClick={() => router.push('/')}
            className="font-noto-sans-tc cursor-pointer bg-pb-green text-cream-200 px-10 py-4 rounded-pill font-medium text-[14px] tracking-widest hover:shadow-lg transition-all"
          >
            回到首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-[clamp(48px,6vw,96px)]">
      <div className="max-w-[680px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="font-cormorant text-xs tracking-[0.26em] uppercase text-taupe-400 mb-3">
            Pre-order
          </div>
          <h1 className="font-serif font-semibold text-[clamp(26px,3.4vw,40px)] text-taupe-800 mb-4">
            預購單
          </h1>
          <p className="font-noto-sans-tc text-taupe-600 text-[14px]">
            填寫預購資訊，我們會透過你選擇的方式與你確認細節並報價。
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-cream-50 rounded-[18px] border border-cream-500 p-[clamp(24px,4vw,40px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. PRODUCT SELECT */}
            <div>
              <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                預購款式 <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setVariant('pair');
                }}
                required
                className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
              >
                <option value="">-- 選擇商品 --</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} （{p.seriesName}）
                  </option>
                ))}
              </select>
            </div>

            {/* 2. VARIANT CHIPS */}
            <div>
              <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                配戴對象／款式 <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {variantOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setVariant(opt.value as Variant)}
                    className={`font-noto-sans-tc cursor-pointer px-4 py-2 rounded-[12px] text-[13px] font-medium transition-all ${
                      variant === opt.value
                        ? 'bg-pb-green text-cream-200'
                        : 'bg-cream-100 border border-taupe-300 text-taupe-700 hover:border-taupe-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {product && (
                <p className="font-noto-sans-tc text-[13px] text-taupe-500 mt-2">
                  價格：{fmt(getPrice())}
                </p>
              )}
            </div>

            {/* 3. QTY & SIZE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                  數量
                </label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
                />
              </div>
              <div>
                <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                  尺寸 (cm)
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="手圍或頸圍"
                  className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
                />
              </div>
            </div>

            {/* 4. YOUR NAME */}
            <div>
              <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                你的稱呼 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="請輸入姓名"
                className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
              />
            </div>

            {/* 5. CONTACT TYPE & CONTACT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                  聯繫方式 <span className="text-red-500">*</span>
                </label>
                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value)}
                  required
                  className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
                >
                  {contactTypes.map((ct) => (
                    <option key={ct.value} value={ct.value}>
                      {ct.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                  帳號／號碼 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  placeholder="帳號或號碼"
                  className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px]"
                />
              </div>
            </div>

            {/* 6. NOTES */}
            <div>
              <label className="font-noto-sans-tc block text-[13px] tracking-widest text-taupe-600 font-medium mb-3 uppercase">
                備註
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="毛孩品種、配色偏好、其他客製需求等..."
                rows={4}
                className="font-noto-sans-tc w-full px-[14px] py-[13px] border border-taupe-300 rounded-[10px] text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-pb-green focus:ring-offset-2 text-[15px] resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                className="font-noto-sans-tc cursor-pointer w-full bg-pb-green text-cream-200 py-[15px] rounded-pill font-medium text-[14px] tracking-widest hover:shadow-lg transition-all"
              >
                送出預購
              </button>
              <p className="font-noto-sans-tc text-[12px] text-taupe-500 mt-4 text-center">
                送出不需付款，確認細節後再行報價
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PreInquiryPage() {
  return (
    <Suspense>
      <PreInquiryForm />
    </Suspense>
  );
}
