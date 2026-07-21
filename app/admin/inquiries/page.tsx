import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import SignoutButton from '@/app/admin/signout-button';
import AdminNavTabs from '@/app/admin/nav-tabs';
import InquiryList from './inquiry-list';

export const metadata = {
  title: '預購單管理 | Petit Bond',
  description: '賣家後台 - 預購單管理',
};

export default async function InquiriesPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-cream-100">
      <nav className="bg-cream-50 border-b border-cream-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pb-green text-gold-300 font-cormorant font-semibold text-base flex items-center justify-center shrink-0">
              PB
            </div>
            <h1 className="font-serif text-xl font-semibold text-taupe-800">預購單管理</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-noto-sans-tc text-sm text-taupe-500">
              {session?.user?.name || session?.user?.email}
            </span>
            <SignoutButton />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminNavTabs active="inquiries" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-cream-50 border border-cream-500 rounded-card-lg shadow-[0_20px_50px_-34px_rgba(30,50,40,.3)] p-6">
          <InquiryList />
        </div>
      </main>
    </div>
  );
}
