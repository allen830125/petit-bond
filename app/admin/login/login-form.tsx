'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(result?.error || '登入失敗，請檢查信箱和密碼');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError('發生錯誤，請稍後重試');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-pb-green text-gold-300 font-cormorant font-semibold text-xl tracking-wider flex items-center justify-center mb-4">
            PB
          </div>
          <h2 className="font-cormorant text-[28px] tracking-[0.18em] text-pb-green">
            Petit Bond
          </h2>
          <p className="mt-2 font-noto-sans-tc text-sm text-taupe-500">賣家後台登入</p>
        </div>

        <form
          className="bg-cream-50 border border-cream-500 rounded-card-lg shadow-[0_20px_50px_-30px_rgba(30,50,40,.4)] p-8 space-y-5"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-medium tracking-wide text-taupe-600 mb-1.5">
              信箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-cream-500 rounded-lg bg-cream-800 text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium tracking-wide text-taupe-600 mb-1.5">
              密碼
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-cream-500 rounded-lg bg-cream-800 text-taupe-800 placeholder-taupe-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-noto-sans-tc bg-pb-green text-cream-100 text-[14px] tracking-widest py-3 rounded-full cursor-pointer hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
}
