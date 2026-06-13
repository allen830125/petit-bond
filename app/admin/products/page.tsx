import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import SignoutButton from '@/app/admin/signout-button';
import ProductList from './product-list';

export const metadata = {
  title: '商品管理 | Petit Bond',
  description: '賣家後台 - 商品管理',
};

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {session?.user?.name || session?.user?.email}
            </span>
            <SignoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <ProductList />
        </div>
      </main>
    </div>
  );
}
